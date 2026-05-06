import { Navbar } from "@/components/layout/Navbar/index";
import { Footer } from "@/components/layout/Footer/index";
import PreApproveForm from "@/components/pre-approve/PreApproveForm";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Credit Application',
  description: 'Apply for credit online. Fast and secure credit application for your next vehicle at JSMY Auto Sales.',
};

export default function CreditApplicationPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main className="pt-32 pb-20">
        <PreApproveForm />
      </main>
      <Footer />
    </div>
  );
}
