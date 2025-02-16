import Footer from "../../../components/Footer";
import EditArticle from "./EditArticle";
import EditProduct from "./EditProduct";
import ArticleTable from "./ArticleTable";
import ProductTable from "./ProductTable";

export default function LayoutWeb() {
    return (
        <div className="min-h-screen flex flex-col">
            <EditArticle />
            <ArticleTable/>
            <ProductTable/>
            <EditProduct/>
            <Footer />
        </div>
    );
}