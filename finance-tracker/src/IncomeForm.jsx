import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    amount: z.number().positive("Amount must be greater than 0"),
    category: z.enum(["Salary", "Borrow", "Loan", "Parents"])
});

function IncomeForm({ addIncome, closeForm }) {
    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
            category: "Salary"
        }
    });

    function onSubmit(data) {
        addIncome(data);
        closeForm();
    }

    return (
        <div className="IncomeForm">
            <h2>Add Money</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <label>Amount</label>
                <input type="number" placeholder="Enter amount"
                    {...register("amount", { valueAsNumber: true })} />
                {errors.amount && (<p>{errors.amount.message}</p>)}

                <label>Category</label>
                <select {...register("category")}>
                    <option value="Salary">Salary</option>
                    <option value="Borrow">Borrow</option>
                    <option value="Loan">Loan</option>
                    <option value="Parents">Parents</option>
                </select>
                {errors.category && (<p>{errors.category.message}</p>)}

                <button type="submit">Add Money</button>
                <button type="button" onClick={closeForm}>Cancel</button>

            </form>
        </div>
    );
}

export default IncomeForm;
