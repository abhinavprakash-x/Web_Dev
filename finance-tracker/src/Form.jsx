import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    description: z.string().trim().min(3, "Minimum length is 3").max(20, "Maximum length is 20"),
    amount: z.number().positive("Amount must be greater than 0"),
    category: z.enum(["Groceries", "Snacks", "Bills", "Miscellaneous"])
});

function Form({ type, onCloseForm, onAddTransaction }) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    });

    return (
        <div className="Form">
            <h2>{type === "income" ? "Add Income" : "Add Expense"}</h2>
            <form onSubmit={handleSubmit((data) => {
                onAddTransaction({...data, type});
                onCloseForm();
            })}>
                <div>
                    <label htmlFor="description">Description</label>
                    <input id="description" {...register("description")} />
                    {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input id="amount" {...register("amount", { valueAsNumber: true })} />
                    {errors.amount && <p>{errors.amount.message}</p>}
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select id="category" {...register("category")}>
                        <option value="Groceries">Groceries</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Bills">Bills</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                    {errors.category && <p>{errors.category.message}</p>}
                </div>
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    )

}

export default Form;