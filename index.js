  const expenseForm = document.getElementById("expenseForm");
        const expenseList = document.getElementById("expenseList");
        const totalAmount = document.getElementById("totalAmount");

        let sessionTotal = 0;

        // Handle form submission
        expenseForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Get input values
            const description = document.getElementById("description").value.trim();
            const amount = Number(document.getElementById("amount").value);
            const category = document.getElementById("category").value;

            // Create expense object
            const expense = {
                id: Date.now(),
                description: description,
                amount: amount,
                category: category
            };

            // Get existing expenses from localStorage
            let expenses = [];

            try {
                const storedData = localStorage.getItem("expenses");
                expenses = storedData ? JSON.parse(storedData) : [];

                if (!Array.isArray(expenses)) {
                    expenses = [];
                }
            } catch (error) {
                alert("Unable to read saved expenses.");
                console.error(error);
                return;
            }

            // Add new expense
            expenses.push(expense);

            // Save updated expenses in localStorage
            try {
                localStorage.setItem("expenses", JSON.stringify(expenses));
            } catch (error) {
                alert("Unable to save expense.");
                console.error(error);
                return;
            }

            // Display the newly added expense
            displayExpense(expense);

            // Clear form
            expenseForm.reset();

        });


        // Display expense in the table
        function displayExpense(expense) {

            // Remove empty message
            const emptyRow = document.getElementById("emptyRow");

            if (emptyRow) {
                emptyRow.remove();
            }

            // Create table row
            const row = document.createElement("tr");

            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = expense.description;

            const categoryCell = document.createElement("td");
            categoryCell.textContent = expense.category;

            const amountCell = document.createElement("td");
            amountCell.textContent = `₹${expense.amount.toFixed(2)}`;

            row.appendChild(descriptionCell);
            row.appendChild(categoryCell);
            row.appendChild(amountCell);

            expenseList.appendChild(row);

            // Update total for this session
            sessionTotal += expense.amount;

            totalAmount.textContent = `₹${sessionTotal.toFixed(2)}`;
        }