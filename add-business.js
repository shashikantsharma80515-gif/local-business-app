let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

let total = businesses.length;
let approved = 0;
let pending = 0;
let rejected = 0;

businesses.forEach(function(business){
    if (business.status === "Approved") {
        approved++;
    } else if (business.status === "Rejected") {
        rejected++;
    } else {
        pending++;
    }
});

document.getElementById("stats").innerHTML = `
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:20px 0;">

<div style="background:#0d6efd;color:white;padding:20px;border-radius:12px;text-align:center;">
<h2>${total}</h2>
<p>📋 Total</p>
</div>

<div style="background:#198754;color:white;padding:20px;border-radius:12px;text-align:center;">
<h2>${approved}</h2>
<p>✅ Approved</p>
</div>

<div style="background:#ffc107;color:black;padding:20px;border-radius:12px;text-align:center;">
<h2>${pending}</h2>
<p>⏳ Pending</p>
</div>

<div style="background:#dc3545;color:white;padding:20px;border-radius:12px;text-align:center;">
<h2>${rejected}</h2>
<p>❌ Rejected</p>
</div>

</div>
`;
