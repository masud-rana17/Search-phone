document.getElementById("button-addon2").addEventListener("click", function() {
	const search = document.getElementById("search");
	const searchValue = search.value;
	if (search.value == '') {
		document.
        getElementById("primary").style.display = "block";
	} else {
		document.getElementById("spinner").style.display = "block";
		document.getElementById("primary").style.display = "none";
		search.value = '';
		const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
		fetch(url)
			.then(response => response.json())
			.then(data => riceived(data.data));
	}
});

const riceived = okriceived => {
	const showData = document.getElementById("show-Data");
	showData.innerHTML = '';
	if (okriceived == '') {
		document.getElementById("alert-danger").style.display = "block";
	} else {
		document.getElementById("alert-danger").style.display = "none";
	}
	okriceived.forEach(fileRiceived => {
		const div = document.createElement("div");
		div.classList.add("col");
		div.innerHTML = `
            <div class="card h-80 w-75 shadow mb-5 bg-white rounded p-4">
            <img src="${fileRiceived.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${fileRiceived.phone_name}</h5>
                <p class="card-text">${fileRiceived.brand}</p>
            </div>
            <button type="button" onclick="sentData('${fileRiceived.slug}')" class="btn-success rounded-3" data-toggle="modal" data-target="#exampleModalCenter"> View Details </button>
           
            </div>
        `;
		showData.appendChild(div);
	});

	document.getElementById("spinner").style.display = "none";
}

const sentData = datariceived => {
	const url = `https://openapi.programming-hero.com/api/phone/${datariceived}`;
	fetch(url)
		.then(response => response.json())
		.then(data => finallyRiceived(data.data))
}

const finallyRiceived = successData => {

	const modalBody = document.getElementById("modal-body");
	modalBody.innerHTML = `
       <h2 class="heading">${successData.name}</h2>

       <div class="table-responsive-xl">
        <table class="table">
        <tr>
            <td>Name</td>
            <td>${successData.name}</td>
        </tr>
        <tr>
            <td>Brand</td>
            <td>${successData.brand}</td>
        </tr>
        <tr>
            <td>ReleaseDate</td>
            <td>${successData.releaseDate}</td>
        </tr>
        <tr>
            <td>Storage</td>
            <td>${successData.mainFeatures.storage}</td>
        </tr>
        <tr>
            <td>DisplaySize</td>
            <td>${successData.mainFeatures.displaySize}</td>
        </tr>
        <tr>
            <td>ChipSet</td>
            <td>${successData.mainFeatures.chipSet}</td>
        </tr>
        <tr>
            <td>Memory</td>
            <td>${successData.mainFeatures.memory}</td>
        </tr>
        <tr>
            <td>Bluetooth</td>
            <td>${successData.others.Bluetooth}</td>
        </tr>
        <tr>
            <td>GPS</td>
            <td>${successData.others.GPS}</td>
        </tr>
        <tr>
            <td>NFC</td>
            <td>${successData.others.NFC}</td>
        </tr>
        <tr>
            <td>Radio</td>
            <td>${successData.others.Radio}</td>
        </tr>
        <tr>
            <td>USB</td>
            <td>${successData.others.USB}</td>
        </tr>
        <tr>
            <td>WLAN</td>
            <td>${successData.others.WLAN}</td>
        </tr>
        <tr>
        </table>
        </div>
       
       `;


}