import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    description: z.string().trim().min(3, "Minimum length is 3").max(20, "Maximum length is 20"),
    amount: z.number().positive("Amount must be greater than 0"),
    category: z.enum(["Groceries","Snacks","Bills","Miscellaneous"])
});

function ExpenseForm({ addExpense, closeForm }) {
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            amount: "",
            category: "Groceries"
        }
    });

    function onSubmit(data) {
        addExpense(data);
        closeForm();
    }

    return (
        <div className="ExpenseForm">
            <h2>Add Expense</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <label>Description</label>
                <input type="text" placeholder="What did you spend on?" {...register("description")}/>
                {errors.description && (<p>{errors.description.message}</p>)}

                <label>Amount</label>
                <input type="number" placeholder="Enter amount" {...register("amount", { valueAsNumber: true})}/>
                {errors.amount && (<p>{errors.amount.message}</p>)}

                <label>Category</label>
                <select {...register("category")}>
                    <option value="Groceries">Groceries</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Bills">Bills</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
                {errors.category && (<p>{errors.category.message}</p>)}

                <button type="submit">Add Expense</button>

                <button type="button" onClick={closeForm}>Cancel</button>

            </form>
        </div>
    );
}

export default ExpenseForm;