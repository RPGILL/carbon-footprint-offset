console.log("✅ JavaScript Loaded!"); // ✅ Check if JavaScript is running

document.addEventListener("DOMContentLoaded", function () {
    console.log("📌 DOM Loaded Successfully");

    function calculateOffset() {
        console.log("📌 Running Carbon Calculator");
        const miles = document.getElementById("miles").value;
        const emissions = miles * 0.411; // Avg. CO2 emission per mile
        document.getElementById("result").innerText = `Your weekly CO2 emissions: ${emissions.toFixed(2)} kg`;
    }

    document.getElementById("interestForm").addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("📤 Form Submitted!"); // ✅ Check if form submits

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        console.log("📥 Data to Send:", { name, email }); // ✅ Check if data is captured

        fetch("https://carbon-footprint-offset.onrender.com/submit-interest", {  // ✅ Works on Render

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("✅ Server Response:", data); // ✅ Check response from server
                if (data.success) {
                    document.getElementById("formMessage").innerText = "Thank you for showing interest!";
                    document.getElementById("interestForm").reset();
                } else {
                    document.getElementById("formMessage").innerText = "Error submitting data.";
                }
            })
            .catch((error) => console.error("❌ Fetch Error!", error)); // ✅ Catch any fetch errors
    });
});
