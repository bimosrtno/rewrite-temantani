import Footer from "@/components/Footer.jsx"
import CustomerTable from "./CustomerTable";


export default function CustomerPage() {
    return (
        <div  className="min-h-screen flex flex-col">
            <h1>Customer Page</h1>
            <CustomerTable />
            <Footer />
        </div>
    ); 
}
