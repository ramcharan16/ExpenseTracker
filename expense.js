//rc.js
document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expenseForm");
    const expenseList = document.getElementById("expenseList");
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function updateExpenseList() {
        expenseList.innerHTML = "";
        expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `
                <span>${expense.description} - $${expense.amount} - Category: ${expense.category}</span>
                <button type="button" class="btn btn-primary btn-sm float-right editBtn" data-index="${index}">Edit</button>
                <button type="button" class="btn btn-danger btn-sm float-right deleteBtn mr-2" data-index="${index}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    function addExpense(description, amount, category) {
        const expense = {
            description,
            amount: parseFloat(amount),
            category
        };
        expenses.push(expense);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateExpenseList();
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateExpenseList();
    }

    function editExpense(index, newDescription, newAmount, newCategory) {
        expenses[index].description = newDescription;
        expenses[index].amount = parseFloat(newAmount);
        expenses[index].category = newCategory;
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateExpenseList();
    }

    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const description = document.getElementById("expenseDescription").value;
        const amount = document.getElementById("expenseAmount").value;
        const category = document.getElementById("expenseCategory").value;
        addExpense(description, amount, category);
        expenseForm.reset();
    });

    expenseList.addEventListener("click", function (event) {
        if (event.target.classList.contains("deleteBtn")) {
            const index = event.target.dataset.index;
            deleteExpense(index);
        } else if (event.target.classList.contains("editBtn")) {
            const index = event.target.dataset.index;
            const expense = expenses[index];
            const newDescription = prompt("Enter new description:", expense.description);
            const newAmount = prompt("Enter new amount:", expense.amount);
            const newCategory = prompt("Enter new category:", expense.category);
            if (newDescription && newAmount && newCategory) {
                editExpense(index, newDescription, newAmount, newCategory);
            } else {
                alert("Invalid input. Please try again.");
            }
        }
    });

    updateExpenseList();
});
