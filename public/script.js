console.log("✅ JavaScript Loaded!");

// ✅ Ensure script runs only when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("📌 DOM Loaded Successfully");

    function calculateOffset() {
        console.log("📌 Running Carbon Calculator");
        const miles = document.getElementById("miles").value;
        if (!miles) {
            document.getElementById("result").innerText = "Please enter miles driven.";
            return;
        }
        const emissions = miles * 0.411; // Avg. CO2 emission per mile
        document.getElementById("result").innerText = `Your weekly CO2 emissions: ${emissions.toFixed(2)} kg`;
    }

    document.getElementById("interestForm").addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("📤 Form Submitted!");

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        console.log("📥 Data to Send:", { name, email });

        fetch("https://carbon-footprint-offset.onrender.com/submit-interest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        })
            .then(response => response.json())
            .then(data => {
                console.log("✅ Server Response:", data);
                if (data.success) {
                    document.getElementById("formMessage").innerText = "Thank you for showing interest!";
                    document.getElementById("interestForm").reset();
                } else {
                    document.getElementById("formMessage").innerText = "Error submitting data.";
                }
            })
            .catch(error => console.error("❌ Fetch Error!", error));
    });

    // ✅ Attach event listener to button
    document.querySelector("button").addEventListener("click", calculateOffset);
});
