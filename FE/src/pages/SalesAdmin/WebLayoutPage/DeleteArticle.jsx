import { deleteArticle } from "@/Services/ArticleService";

const DeleteArticle = ({ id, onDeleteSuccess }) => {
    const handleDelete = async () => {
        if (window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
            try {
                await deleteArticle(id);
                onDeleteSuccess(); 
            } catch (error) {
                console.error("Error deleting article:", error);
            }
        }
    };

    return (
        <button 
            onClick={handleDelete} 
            className="bg-red-500 text-white px-3 py-1 rounded ml-2"
        >
            Hapus
        </button>
    );
};

export default DeleteArticle;