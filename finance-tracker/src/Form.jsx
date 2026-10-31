import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    expense: z.string().min(3, "Minimum Length is 3").max(20, "Maximum Length is 20"),
    amount: z.number().min(1, "Expense Can't be < 0"),
    category: z.enum(["Groceries", "Snacks", "Bills", "Miscellaneous"], "Invalid Category")
});

function Form() {
    return (
        <>
            <h2>Form</h2>
        </>
    );
}

export default Form;