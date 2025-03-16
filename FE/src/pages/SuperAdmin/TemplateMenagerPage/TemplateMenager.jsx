import Footer from "@/components/Footer.jsx"
import CustomerTable from "../../SalesAdmin/CustomerPage/CustomerTable";
import TemplateTable from "./TemplateTable";




export default function CustomerPage() {
    return (
        <div  className="min-h-screen flex flex-col">
            <CustomerTable />
            <TemplateTable/>
            <Footer />
        </div>
    ); 
}
