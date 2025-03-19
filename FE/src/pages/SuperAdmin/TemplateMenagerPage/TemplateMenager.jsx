import Footer from "@/components/Footer.jsx"
import CustomerTable from "../../SalesAdmin/CustomerPage/CustomerTable";
import TemplateTable from "./TemplateTable";
import EmailBlastButton from "./BlastEmailButton";




export default function CustomerPage() {
    return (
        <div  className="min-h-screen flex flex-col">
            <EmailBlastButton/>
            <CustomerTable />
            <TemplateTable/>
            <Footer />
        </div>
    ); 
}
