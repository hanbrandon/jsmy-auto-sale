'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import {
    ACQUISITION_FEES,
    calcRegFee,
    CA_DMV_CONSTANTS,
} from '@/constants/dmv';
import { cn } from '@/utils/cn';
import {
    ChevronDown,
    Maximize2,
    X,
    ChevronLeft,
    ChevronRight,
    Printer,
    Calculator,
    Car,
    ShoppingBag,
    History,
    Mail,
    Phone,
    User,
    ExternalLink,
} from 'lucide-react';

export default function AdminCalculator() {
    const [activeTab, setActiveTab] = useState<
        'leasing' | 'purchasing' | 'used'
    >('leasing');
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
    });

    // Leasing State
    const [leaseParams, setLeaseParams] = useState({
        model: '',
        msrp: '',
        capCost: '',
        moneyFactor: '',
        residual: '',
        term: '36',
        driveOff: '0',
        rebate: '0',
        acqFee: 925,
        acqBrand: 'BMW / MINI',
        taxRate: '10.25',
    });
    const [leaseResult, setLeaseResult] = useState<any>(null);
    const [isAcqOpen, setIsAcqOpen] = useState(false);

    // Purchase State
    const [purchaseParams, setPurchaseParams] = useState({
        model: '',
        price: '',
        down: '',
        term: '60',
        apr: '5.9',
        taxRate: '10.25',
        rebate: '0',
        accessories: '0',
        kbb: '',
    });
    const [purchaseResult, setPurchaseResult] = useState<any>(null);

    // Used State
    const [usedParams, setUsedParams] = useState({
        model: '',
        price: '',
        down: '',
        term: '60',
        apr: '6.9',
        taxRate: '10.25',
        rebate: '0',
        kbb: '',
    });
    const [usedResult, setUsedResult] = useState<any>(null);

    const fmt = (n: number) =>
        '$' +
        n.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const calculateLease = () => {
        const msrp = parseFloat(leaseParams.msrp) || 0;
        const cap = parseFloat(leaseParams.capCost) || 0;
        const mf = parseFloat(leaseParams.moneyFactor) || 0;
        const res_in = parseFloat(leaseParams.residual) || 0;
        const term = parseFloat(leaseParams.term) || 0;
        const driveoff = parseFloat(leaseParams.driveOff) || 0;
        const rebate = parseFloat(leaseParams.rebate) || 0;
        const acq = leaseParams.acqFee;
        const tax_rate = parseFloat(leaseParams.taxRate) || 0;

        if (!msrp || !cap || !mf || !res_in || !term) return;

        const reg = calcRegFee(cap);
        const lt = 1 + tax_rate / 100;
        const tax_adj = 1 - tax_rate / 100;
        const tax_adj1 = 1 - (tax_rate / 100) * (tax_rate / 100);

        const cost = acq + reg + CA_DMV_CONSTANTS.OTHER_FEES;
        const drive = driveoff + rebate;
        const acc_sub1 = cost - driveoff - rebate;
        const sell_c = cap + acc_sub1;
        const acc = cap + tax_adj * acc_sub1;
        const mm = term * mf;
        const mm1 = mm + 1;
        const mm2 = mm - 1;

        let lr, lr_disp;
        if (res_in < 100) {
            lr = msrp * (res_in / 100);
            lr_disp = `${res_in.toFixed(2)}% = ${fmt(lr)}`;
        } else {
            lr = res_in;
            lr_disp = `${fmt(lr)} (${((res_in / msrp) * 100).toFixed(2)}%)`;
        }

        const lease =
            drive <= cost
                ? (sell_c * mm1 + lr * mm2) / (term - lt * mm1)
                : (acc * mm1 + lr * mm2) / (term - tax_adj1 * mm1);

        const ltax = lease * (lt - 1);
        const ltotal = lease * lt;

        setLeaseResult({
            monthly: ltotal,
            base: lease,
            tax: ltax,
            residual: lr_disp,
            reg: reg,
            apr: (mf * 2400).toFixed(2) + '%',
        });
    };

    const calculatePurchase = () => {
        const price = parseFloat(purchaseParams.price) || 0;
        const acc_v = parseFloat(purchaseParams.accessories) || 0;
        const down = parseFloat(purchaseParams.down) || 0;
        const term = parseFloat(purchaseParams.term) || 0;
        const apr = parseFloat(purchaseParams.apr) || 0;
        const tax_r = parseFloat(purchaseParams.taxRate) || 0;
        const rebate = parseFloat(purchaseParams.rebate) || 0;
        const kbb = parseFloat(purchaseParams.kbb) || 0;

        if (!price || !term) return;

        const st = 1 + tax_r / 100;
        const reg = calcRegFee(price);
        const taxAmt =
            (price + acc_v + CA_DMV_CONSTANTS.DOCUMENT_FEE) * (st - 1);
        const otd1 = (price + acc_v + CA_DMV_CONSTANTS.DOCUMENT_FEE) * st;
        const otd =
            otd1 + reg - down - rebate + CA_DMV_CONSTANTS.ELECTRONIC_FILING;
        const fin = otd;

        const r = apr / 100 / 12;
        let pay = 0;
        if (r > 0) {
            pay =
                (fin * (r * Math.pow(1 + r, term))) /
                (Math.pow(1 + r, term) - 1);
        } else {
            pay = fin / term;
        }

        setPurchaseResult({
            monthly: pay,
            otd: otd + down, // OTD including down
            fin: fin,
            charge: pay * term - fin,
            tax: taxAmt,
            reg: reg,
            ltv: kbb > 0 ? (((otd + down) / kbb) * 100).toFixed(1) + '%' : '-',
        });
    };

    const calculateUsed = () => {
        const price = parseFloat(usedParams.price) || 0;
        const down = parseFloat(usedParams.down) || 0;
        const term = parseFloat(usedParams.term) || 0;
        const apr = parseFloat(usedParams.apr) || 0;
        const tax_r = parseFloat(usedParams.taxRate) || 0;
        const rebate = parseFloat(usedParams.rebate) || 0;
        const kbb = parseFloat(usedParams.kbb) || 0;

        if (!price || !term) return;

        const st = 1 + tax_r / 100;
        const reg = calcRegFee(price);
        const taxAmt = (price + CA_DMV_CONSTANTS.DOCUMENT_FEE) * (st - 1);
        const otd1 = (price + CA_DMV_CONSTANTS.DOCUMENT_FEE) * st;
        const otd =
            otd1 + reg - down - rebate + CA_DMV_CONSTANTS.ELECTRONIC_FILING;
        const fin = otd;

        const r = apr / 100 / 12;
        let pay = 0;
        if (r > 0) {
            pay =
                (fin * (r * Math.pow(1 + r, term))) /
                (Math.pow(1 + r, term) - 1);
        } else {
            pay = fin / term;
        }

        setUsedResult({
            monthly: pay,
            otd: otd + down,
            fin: fin,
            charge: pay * term - fin,
            tax: taxAmt,
            reg: reg,
            ltv: kbb > 0 ? ((fin / kbb) * 100).toFixed(1) + '%' : '-',
        });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-brand-950 text-white selection:bg-white selection:text-black print:bg-white print:text-black">
            <div className="print:hidden">
                <Navbar />
            </div>

            <main className="pt-32 pb-20 px-4 print:pt-0 print:pb-0 print:px-0">
                <Section className="max-w-5xl mx-auto print:max-w-none print:m-0">
                    {/* Header Controls */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 print:hidden">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
                            >
                                JSMY{' '}
                                <span className="text-white/40">
                                    Calculator
                                </span>
                            </motion.h1>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    {
                                        label: 'Tax Rate',
                                        href: 'https://www.cdtfa.ca.gov/taxes-and-fees/rates.aspx',
                                    },
                                    {
                                        label: 'Carfax',
                                        href: 'https://www.carfaxonline.com',
                                    },
                                    {
                                        label: 'QuickValue',
                                        href: 'https://www.quickvalues.com/',
                                    },
                                    {
                                        label: 'MMR',
                                        href: 'https://www.manheim.com',
                                    },
                                ].map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] font-black tracking-widest uppercase py-2 px-4 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
                                    >
                                        {link.label} <ExternalLink size={10} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/30 bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">
                            <span className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />{' '}
                                CA DMV 2025–2026
                            </span>
                            <span className="hidden sm:inline opacity-30">
                                |
                            </span>
                            <span className="hidden sm:inline">VLF 0.65%</span>
                        </div>
                    </div>

                    {/* Print Only Header */}
                    <div className="hidden print:block mb-6 border-b-2 border-brand-500 pb-4">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-black border-none p-0 m-0 leading-none">
                                    JSMY{' '}
                                    <span className="text-brand-600">Auto</span>{' '}
                                    Sales
                                </h1>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black mt-2">
                                    Premium Vehicle Leasing & Sales Specialist
                                </p>
                            </div>
                            <div className="text-right text-[9px] leading-relaxed text-gray-500 font-medium">
                                8 Corporate Park, Ste 300, Irvine, CA 92606
                                <br />
                                Tel: (714) 681-0161 |
                                justin.jsmyautosales@gmail.com
                                <br />
                                www.jsmyautosales.com
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4">
                            <div>
                                <p className="text-[8px] font-black text-gray-400 uppercase mb-1 tracking-tighter">
                                    Customer Name
                                </p>
                                <p className="text-xs font-bold text-black border-b border-gray-200 min-h-[1.2rem]">
                                    {customer.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-gray-400 uppercase mb-1 tracking-tighter">
                                    Email Address
                                </p>
                                <p className="text-xs font-bold text-black border-b border-gray-200 min-h-[1.2rem]">
                                    {customer.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-gray-400 uppercase mb-1 tracking-tighter">
                                    Phone Number
                                </p>
                                <p className="text-xs font-bold text-black border-b border-gray-200 min-h-[1.2rem]">
                                    {customer.phone}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-3xl mb-8 print:hidden">
                        {[
                            { id: 'leasing', label: 'Leasing', icon: Car },
                            {
                                id: 'purchasing',
                                label: 'Purchasing',
                                icon: ShoppingBag,
                            },
                            {
                                id: 'used',
                                label: 'Used Vehicle',
                                icon: History,
                            },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    'flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all duration-300',
                                    activeTab === tab.id
                                        ? 'bg-white text-black shadow-xl'
                                        : 'text-white/40 hover:text-white hover:bg-white/5',
                                )}
                            >
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Customer Info Card */}
                    <div className="glass-premium rounded-4xl p-8 mb-8 print:hidden">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                                <User size={18} />
                            </div>
                            <h2 className="text-xs font-black tracking-[0.2em] uppercase text-white/40">
                                Customer Information
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    id: 'name',
                                    label: 'Full Name',
                                    icon: User,
                                    placeholder: 'Justin Han',
                                },
                                {
                                    id: 'email',
                                    label: 'Email Address',
                                    icon: Mail,
                                    placeholder: 'example@email.com',
                                },
                                {
                                    id: 'phone',
                                    label: 'Phone Number',
                                    icon: Phone,
                                    placeholder: '(000) 000-0000',
                                },
                            ].map((field) => (
                                <div key={field.id} className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                                        {field.label}
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors">
                                            <field.icon size={16} />
                                        </div>
                                        <input
                                            type="text"
                                            value={(customer as any)[field.id]}
                                            onChange={(e) =>
                                                setCustomer({
                                                    ...customer,
                                                    [field.id]: e.target.value,
                                                })
                                            }
                                            placeholder={field.placeholder}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Calculator Body */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start print:grid-cols-2 print:gap-4">
                        {/* Input Panel */}
                        <div className="glass-premium rounded-4xl p-8 print:border print:border-gray-100 print:bg-white print:rounded-xl print:p-4 print:shadow-none">
                            <div className="flex items-center gap-3 mb-8 print:mb-4 print:text-black">
                                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center print:bg-gray-50 print:w-6 print:h-6 print:rounded-lg">
                                    <Calculator
                                        size={18}
                                        className="print:w-3 print:h-3"
                                    />
                                </div>
                                <h2 className="text-xs font-black tracking-[0.2em] uppercase text-white/40 print:text-[8px] print:text-gray-400">
                                    {activeTab === 'leasing'
                                        ? 'Lease Details'
                                        : activeTab === 'purchasing'
                                          ? 'Purchase Details'
                                          : 'Used Vehicle Details'}
                                </h2>
                            </div>

                            <div className="space-y-6 print:space-y-3">
                                {activeTab === 'leasing' && (
                                    <>
                                        <div className="space-y-2 print:space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                Year / Make / Model
                                            </label>
                                            <input
                                                value={leaseParams.model}
                                                onChange={(e) =>
                                                    setLeaseParams({
                                                        ...leaseParams,
                                                        model: e.target.value,
                                                    })
                                                }
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:px-3 print:text-[10px] print:text-black print:font-bold"
                                                placeholder="e.g. 2025 BMW X3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 print:gap-3">
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    MSRP
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:left-2 print:text-[8px]">
                                                        $
                                                    </span>
                                                    <input
                                                        value={leaseParams.msrp}
                                                        onChange={(e) =>
                                                            setLeaseParams({
                                                                ...leaseParams,
                                                                msrp: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-8 pr-4 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-5 print:pr-2 print:text-[10px] print:text-black print:font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Cap Cost
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:left-2 print:text-[8px]">
                                                        $
                                                    </span>
                                                    <input
                                                        value={
                                                            leaseParams.capCost
                                                        }
                                                        onChange={(e) =>
                                                            setLeaseParams({
                                                                ...leaseParams,
                                                                capCost:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-8 pr-4 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-5 print:pr-2 print:text-[10px] print:text-black print:font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 print:gap-3">
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Money Factor
                                                </label>
                                                <input
                                                    value={
                                                        leaseParams.moneyFactor
                                                    }
                                                    onChange={(e) =>
                                                        setLeaseParams({
                                                            ...leaseParams,
                                                            moneyFactor:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:px-3 print:text-[10px] print:text-black print:font-bold"
                                                    placeholder="0.00125"
                                                />
                                            </div>
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Residual (% or $)
                                                </label>
                                                <input
                                                    value={leaseParams.residual}
                                                    onChange={(e) =>
                                                        setLeaseParams({
                                                            ...leaseParams,
                                                            residual:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:px-3 print:text-[10px] print:text-black print:font-bold"
                                                    placeholder="55"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 print:gap-3">
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Term (months)
                                                </label>
                                                <input
                                                    value={leaseParams.term}
                                                    onChange={(e) =>
                                                        setLeaseParams({
                                                            ...leaseParams,
                                                            term: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:px-3 print:text-[10px] print:text-black print:font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Total Drive Off
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:left-2 print:text-[8px]">
                                                        $
                                                    </span>
                                                    <input
                                                        value={
                                                            leaseParams.driveOff
                                                        }
                                                        onChange={(e) =>
                                                            setLeaseParams({
                                                                ...leaseParams,
                                                                driveOff:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-8 pr-4 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-5 print:pr-2 print:text-[10px] print:text-black print:font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 print:space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                Acquisition Fee
                                            </label>
                                            <div className="relative print:hidden">
                                                <button
                                                    onClick={() =>
                                                        setIsAcqOpen(!isAcqOpen)
                                                    }
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 flex items-center justify-between hover:bg-white/10 transition-all text-left"
                                                >
                                                    <div>
                                                        <span className="font-bold mr-3">
                                                            {
                                                                leaseParams.acqBrand
                                                            }
                                                        </span>
                                                        <span className="text-white/40">
                                                            {fmt(
                                                                leaseParams.acqFee,
                                                            )}
                                                        </span>
                                                    </div>
                                                    <ChevronDown
                                                        size={16}
                                                        className={cn(
                                                            'transition-transform duration-300',
                                                            isAcqOpen &&
                                                                'rotate-180',
                                                        )}
                                                    />
                                                </button>

                                                <AnimatePresence>
                                                    {isAcqOpen && (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                y: 10,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                y: 10,
                                                            }}
                                                            className="absolute z-50 left-0 right-0 top-full mt-2 bg-brand-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto"
                                                        >
                                                            {ACQUISITION_FEES.map(
                                                                (fee) => (
                                                                    <button
                                                                        key={
                                                                            fee.brand
                                                                        }
                                                                        onClick={() => {
                                                                            setLeaseParams(
                                                                                {
                                                                                    ...leaseParams,
                                                                                    acqFee: fee.fee,
                                                                                    acqBrand:
                                                                                        fee.brand,
                                                                                },
                                                                            );
                                                                            setIsAcqOpen(
                                                                                false,
                                                                            );
                                                                        }}
                                                                        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                                                    >
                                                                        <span
                                                                            className={cn(
                                                                                'text-sm',
                                                                                leaseParams.acqBrand ===
                                                                                    fee.brand
                                                                                    ? 'text-white font-bold'
                                                                                    : 'text-white/60',
                                                                            )}
                                                                        >
                                                                            {
                                                                                fee.brand
                                                                            }
                                                                        </span>
                                                                        <span className="text-sm font-mono text-white/40">
                                                                            $
                                                                            {fee.fee.toLocaleString()}
                                                                        </span>
                                                                    </button>
                                                                ),
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            <div className="hidden print:block py-1.5 px-3 bg-gray-50 border border-gray-200 rounded-lg text-[10px]">
                                                <span className="text-black font-bold mr-2">
                                                    {leaseParams.acqBrand}
                                                </span>
                                                <span className="text-gray-500 font-bold">
                                                    {fmt(leaseParams.acqFee)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 print:gap-3">
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Rebate
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:left-2 print:text-[8px]">
                                                        $
                                                    </span>
                                                    <input
                                                        value={
                                                            leaseParams.rebate
                                                        }
                                                        onChange={(e) =>
                                                            setLeaseParams({
                                                                ...leaseParams,
                                                                rebate: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-8 pr-4 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-5 print:pr-2 print:text-[10px] print:text-black print:font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Sales Tax (%)
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:right-2 print:text-[8px]">
                                                        %
                                                    </span>
                                                    <input
                                                        value={
                                                            leaseParams.taxRate
                                                        }
                                                        onChange={(e) =>
                                                            setLeaseParams({
                                                                ...leaseParams,
                                                                taxRate:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-10 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-2 print:pr-5 print:text-[10px] print:text-black print:font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {(activeTab === 'purchasing' ||
                                    activeTab === 'used') && (
                                    <>
                                        <div className="space-y-2 print:space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                Year / Make / Model
                                            </label>
                                            <input
                                                value={
                                                    activeTab === 'purchasing'
                                                        ? purchaseParams.model
                                                        : usedParams.model
                                                }
                                                onChange={(e) =>
                                                    activeTab === 'purchasing'
                                                        ? setPurchaseParams({
                                                              ...purchaseParams,
                                                              model: e.target
                                                                  .value,
                                                          })
                                                        : setUsedParams({
                                                              ...usedParams,
                                                              model: e.target
                                                                  .value,
                                                          })
                                                }
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:px-3 print:text-[10px] print:text-black print:font-bold"
                                                placeholder="e.g. 2025 Honda Accord"
                                            />
                                        </div>
                                        <div className="space-y-2 print:space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                Selling Price
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:left-2 print:text-[8px]">
                                                    $
                                                </span>
                                                <input
                                                    value={
                                                        activeTab ===
                                                        'purchasing'
                                                            ? purchaseParams.price
                                                            : usedParams.price
                                                    }
                                                    onChange={(e) =>
                                                        activeTab ===
                                                        'purchasing'
                                                            ? setPurchaseParams(
                                                                  {
                                                                      ...purchaseParams,
                                                                      price: e
                                                                          .target
                                                                          .value,
                                                                  },
                                                              )
                                                            : setUsedParams({
                                                                  ...usedParams,
                                                                  price: e
                                                                      .target
                                                                      .value,
                                                              })
                                                    }
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-8 pr-4 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-5 print:pr-2 print:text-[10px] print:text-black print:font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 print:gap-3">
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Down Payment
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:left-2 print:text-[8px]">
                                                        $
                                                    </span>
                                                    <input
                                                        value={
                                                            activeTab ===
                                                            'purchasing'
                                                                ? purchaseParams.down
                                                                : usedParams.down
                                                        }
                                                        onChange={(e) =>
                                                            activeTab ===
                                                            'purchasing'
                                                                ? setPurchaseParams(
                                                                      {
                                                                          ...purchaseParams,
                                                                          down: e
                                                                              .target
                                                                              .value,
                                                                      },
                                                                  )
                                                                : setUsedParams(
                                                                      {
                                                                          ...usedParams,
                                                                          down: e
                                                                              .target
                                                                              .value,
                                                                      },
                                                                  )
                                                        }
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-8 pr-4 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-5 print:pr-2 print:text-[10px] print:text-black print:font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Term (months)
                                                </label>
                                                <input
                                                    value={
                                                        activeTab ===
                                                        'purchasing'
                                                            ? purchaseParams.term
                                                            : usedParams.term
                                                    }
                                                    onChange={(e) =>
                                                        activeTab ===
                                                        'purchasing'
                                                            ? setPurchaseParams(
                                                                  {
                                                                      ...purchaseParams,
                                                                      term: e
                                                                          .target
                                                                          .value,
                                                                  },
                                                              )
                                                            : setUsedParams({
                                                                  ...usedParams,
                                                                  term: e.target
                                                                      .value,
                                                              })
                                                    }
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:px-3 print:text-[10px] print:text-black print:font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 print:gap-3">
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    APR (%)
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:right-2 print:text-[8px]">
                                                        %
                                                    </span>
                                                    <input
                                                        value={
                                                            activeTab ===
                                                            'purchasing'
                                                                ? purchaseParams.apr
                                                                : usedParams.apr
                                                        }
                                                        onChange={(e) =>
                                                            activeTab ===
                                                            'purchasing'
                                                                ? setPurchaseParams(
                                                                      {
                                                                          ...purchaseParams,
                                                                          apr: e
                                                                              .target
                                                                              .value,
                                                                      },
                                                                  )
                                                                : setUsedParams(
                                                                      {
                                                                          ...usedParams,
                                                                          apr: e
                                                                              .target
                                                                              .value,
                                                                      },
                                                                  )
                                                        }
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-10 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-2 print:pr-5 print:text-[10px] print:text-black print:font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Sales Tax (%)
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:right-2 print:text-[8px]">
                                                        %
                                                    </span>
                                                    <input
                                                        value={
                                                            activeTab ===
                                                            'purchasing'
                                                                ? purchaseParams.taxRate
                                                                : usedParams.taxRate
                                                        }
                                                        onChange={(e) =>
                                                            activeTab ===
                                                            'purchasing'
                                                                ? setPurchaseParams(
                                                                      {
                                                                          ...purchaseParams,
                                                                          taxRate:
                                                                              e
                                                                                  .target
                                                                                  .value,
                                                                      },
                                                                  )
                                                                : setUsedParams(
                                                                      {
                                                                          ...usedParams,
                                                                          taxRate:
                                                                              e
                                                                                  .target
                                                                                  .value,
                                                                      },
                                                                  )
                                                        }
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-10 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-2 print:pr-5 print:text-[10px] print:text-black print:font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 print:gap-3">
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Rebate
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:left-2 print:text-[8px]">
                                                        $
                                                    </span>
                                                    <input
                                                        value={
                                                            activeTab ===
                                                            'purchasing'
                                                                ? purchaseParams.rebate
                                                                : usedParams.rebate
                                                        }
                                                        onChange={(e) =>
                                                            activeTab ===
                                                            'purchasing'
                                                                ? setPurchaseParams(
                                                                      {
                                                                          ...purchaseParams,
                                                                          rebate: e
                                                                              .target
                                                                              .value,
                                                                      },
                                                                  )
                                                                : setUsedParams(
                                                                      {
                                                                          ...usedParams,
                                                                          rebate: e
                                                                              .target
                                                                              .value,
                                                                      },
                                                                  )
                                                        }
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-8 pr-4 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-5 print:pr-2 print:text-[10px] print:text-black print:font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Invoice / KBB
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:left-2 print:text-[8px]">
                                                        $
                                                    </span>
                                                    <input
                                                        value={
                                                            activeTab ===
                                                            'purchasing'
                                                                ? purchaseParams.kbb
                                                                : usedParams.kbb
                                                        }
                                                        onChange={(e) =>
                                                            activeTab ===
                                                            'purchasing'
                                                                ? setPurchaseParams(
                                                                      {
                                                                          ...purchaseParams,
                                                                          kbb: e
                                                                              .target
                                                                              .value,
                                                                      },
                                                                  )
                                                                : setUsedParams(
                                                                      {
                                                                          ...usedParams,
                                                                          kbb: e
                                                                              .target
                                                                              .value,
                                                                      },
                                                                  )
                                                        }
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-8 pr-4 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-5 print:pr-2 print:text-[10px] print:text-black print:font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {activeTab === 'purchasing' && (
                                            <div className="space-y-2 print:space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 print:text-[7px] print:text-gray-400">
                                                    Accessories
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 print:text-gray-400 print:left-2 print:text-[8px]">
                                                        $
                                                    </span>
                                                    <input
                                                        value={
                                                            purchaseParams.accessories
                                                        }
                                                        onChange={(e) =>
                                                            setPurchaseParams({
                                                                ...purchaseParams,
                                                                accessories:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-8 pr-4 focus:outline-none focus:border-white/20 print:bg-gray-50 print:border-gray-200 print:rounded-lg print:py-1.5 print:pl-5 print:pr-2 print:text-[10px] print:text-black print:font-bold"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="pt-4 flex flex-col gap-3 print:hidden">
                                    <Button
                                        onClick={() => {
                                            if (activeTab === 'leasing')
                                                calculateLease();
                                            else if (activeTab === 'purchasing')
                                                calculatePurchase();
                                            else calculateUsed();
                                        }}
                                        className="w-full"
                                    >
                                        Calculate
                                    </Button>
                                    <button
                                        onClick={handlePrint}
                                        className="w-full py-4 rounded-full border border-white/10 text-[10px] font-black tracking-widest uppercase hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Printer size={14} />
                                        Print Quote
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Result Panel */}
                        <AnimatePresence mode="wait">
                            {(
                                activeTab === 'leasing'
                                    ? leaseResult
                                    : activeTab === 'purchasing'
                                      ? purchaseResult
                                      : usedResult
                            ) ? (
                                <motion.div
                                    key={activeTab + '-result'}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="glass-premium rounded-4xl p-8 sticky top-32 print:border print:border-brand-100 print:bg-white print:relative print:top-0 print:shadow-none print:rounded-xl print:p-4"
                                >
                                    <div className="flex items-center gap-3 mb-8 print:mb-4 print:text-black">
                                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center print:bg-brand-50 print:w-6 print:h-6 print:rounded-lg">
                                            <Maximize2
                                                size={18}
                                                className="print:w-3 print:h-3 print:text-brand-600"
                                            />
                                        </div>
                                        <h2 className="text-xs font-black tracking-[0.2em] uppercase text-white/40 print:text-[8px] print:text-brand-400">
                                            Calculation Results
                                        </h2>
                                    </div>

                                    <div className="bg-white/3 border border-white/10 rounded-3xl p-8 mb-8 text-center print:bg-brand-50/30 print:border-brand-100 print:rounded-xl print:p-4 print:mb-4 print:text-black">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-1 print:text-[8px]">
                                            Monthly Payment
                                        </p>
                                        <div className="text-5xl font-bold tracking-tighter mb-2 print:text-3xl print:mb-1">
                                            {fmt(
                                                activeTab === 'leasing'
                                                    ? leaseResult.monthly
                                                    : activeTab === 'purchasing'
                                                      ? purchaseResult.monthly
                                                      : usedResult.monthly,
                                            )}
                                            <span className="text-lg text-white/40 font-medium tracking-normal ml-2 print:text-[10px] print:text-gray-400">
                                                / mo
                                            </span>
                                        </div>
                                        {activeTab === 'leasing' && (
                                            <p className="text-xs text-white/30 font-medium print:text-[8px] print:text-gray-400">
                                                Before tax{' '}
                                                {fmt(leaseResult.base)} + Tax{' '}
                                                {fmt(leaseResult.tax)}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2 print:space-y-1">
                                        {activeTab === 'leasing' && (
                                            <>
                                                <ResultRow
                                                    label="Before Tax"
                                                    value={fmt(
                                                        leaseResult.base,
                                                    )}
                                                />
                                                <ResultRow
                                                    label="Tax"
                                                    value={fmt(leaseResult.tax)}
                                                />
                                                <ResultRow
                                                    label="Residual"
                                                    value={leaseResult.residual}
                                                />
                                                <ResultRow
                                                    label="Registration Fee"
                                                    value={fmt(leaseResult.reg)}
                                                    isHighlight
                                                />
                                                <ResultRow
                                                    label="APR Equivalent"
                                                    value={leaseResult.apr}
                                                />
                                            </>
                                        )}
                                        {(activeTab === 'purchasing' ||
                                            activeTab === 'used') && (
                                            <>
                                                <ResultRow
                                                    label="OTD Amount"
                                                    value={fmt(
                                                        activeTab ===
                                                            'purchasing'
                                                            ? purchaseResult.otd
                                                            : usedResult.otd,
                                                    )}
                                                />
                                                <ResultRow
                                                    label="Finance Amount"
                                                    value={fmt(
                                                        activeTab ===
                                                            'purchasing'
                                                            ? purchaseResult.fin
                                                            : usedResult.fin,
                                                    )}
                                                />
                                                <ResultRow
                                                    label="Finance Charge"
                                                    value={fmt(
                                                        activeTab ===
                                                            'purchasing'
                                                            ? purchaseResult.charge
                                                            : usedResult.charge,
                                                    )}
                                                />
                                                <ResultRow
                                                    label="Sales Tax"
                                                    value={fmt(
                                                        activeTab ===
                                                            'purchasing'
                                                            ? purchaseResult.tax
                                                            : usedResult.tax,
                                                    )}
                                                />
                                                <ResultRow
                                                    label="Registration Fee"
                                                    value={fmt(
                                                        activeTab ===
                                                            'purchasing'
                                                            ? purchaseResult.reg
                                                            : usedResult.reg,
                                                    )}
                                                    isHighlight
                                                />
                                                <ResultRow
                                                    label="Loan to Value"
                                                    value={
                                                        activeTab ===
                                                        'purchasing'
                                                            ? purchaseResult.ltv
                                                            : usedResult.ltv
                                                    }
                                                />
                                            </>
                                        )}
                                    </div>

                                    <div className="hidden print:flex mt-6 pt-4 border-t-2 border-gray-100 justify-between items-end">
                                        <div className="w-1/2 pr-4 border-r border-gray-100">
                                            <p className="text-[7px] text-gray-300 uppercase tracking-widest font-black mb-1">
                                                Terms & Conditions
                                            </p>
                                            <p className="text-[6px] text-gray-400 leading-tight">
                                                All prices and terms are subject
                                                to credit approval and
                                                availability. Estimates are
                                                provided for informational
                                                purposes only. California DMV
                                                fees are based on 2025-2026
                                                rates.
                                            </p>
                                        </div>
                                        <div className="w-1/3 text-right">
                                            <div className="border-b border-black h-8 mb-1"></div>
                                            <p className="text-[7px] text-gray-400 uppercase font-black">
                                                Authorized Signature
                                            </p>
                                        </div>
                                    </div>

                                    <div className="hidden print:block mt-4 text-center">
                                        <p className="text-[8px] text-brand-400 font-black tracking-[0.2em] uppercase">
                                            JSMY Auto Sales · Professional
                                            Automotive Services
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="no-result"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/5 rounded-4xl text-white/20 print:hidden"
                                >
                                    <Calculator
                                        size={48}
                                        className="mb-4 opacity-20"
                                    />
                                    <p className="text-sm font-bold uppercase tracking-widest">
                                        Enter values to see results
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Section>
            </main>

            <div className="print:hidden">
                <Footer />
            </div>
        </div>
    );
}

function ResultRow({
    label,
    value,
    isHighlight,
}: {
    label: string;
    value: string;
    isHighlight?: boolean;
}) {
    return (
        <div className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 print:border-gray-100 print:py-1.5">
            <span className="text-xs font-medium text-white/40 print:text-gray-500 print:text-[8px]">
                {label}
            </span>
            <span
                className={cn(
                    'text-sm font-bold',
                    isHighlight
                        ? 'text-emerald-400 print:text-emerald-600'
                        : 'text-white print:text-black',
                    'print:text-[10px]',
                )}
            >
                {value}
            </span>
        </div>
    );
}
