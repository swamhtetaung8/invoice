const services = [
  {
    id: 1,
    name: "Domain service",
    price: 15,
  },
  {
    id: 2,
    name: "Hosting service",
    price: 30,
  },
  {
    id: 3,
    name: "Web design service",
    price: 150,
  },
  {
    id: 4,
    name: "Maintenance service",
    price: 100,
  },
];

const app = document.getElementById("app");
const invoiceForm = document.getElementById("invoiceForm");
const serviceOption = document.getElementById("serviceOption");
const quantity = document.getElementById("quantity");
const lists = document.getElementById("lists");
const subTotal = document.getElementById("subTotal");
const tax = document.getElementById("tax");
const total = document.getElementById("total");
const table = document.getElementById("table");
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalForm = document.getElementById("modalForm");

const createTr = (service, quantity) => {
  const tr = document.createElement("tr");
  const total = service.price * quantity;
  tr.innerHTML = `
    <td class="d-flex justify-content-between">${service.name} <i class="bi bi-trash3 text-danger delBtn"></i></td>
    <td class="text-end quantity">${quantity}</td>
    <td class="text-end price">$${service.price}</td>
    <td class="text-end">$<span class="totalPrice">${total}</span></td>
  `;
  tr.setAttribute("service-id", service.id);
  return tr;
};

const updateSubtotal = () => {
  const individualPrice = [...lists.children];
  let subEx = individualPrice.reduce(
    (pv, cv) => pv + parseFloat(cv.querySelector(".totalPrice").innerText),
    0
  );

  subTotal.innerText = subEx;
};

const calcTax = (taxSample = 5) => {
  tax.innerText = subTotal.innerText * (taxSample / 100);
};

const updateTotal = () => {
  total.innerText = parseFloat(subTotal.innerText) + parseFloat(tax.innerText);
};

const showTable = () => {
  if (lists.children.length) {
    table.classList.remove("d-none");
  } else {
    table.classList.add("d-none");
  }
};

services.forEach((service) =>
  serviceOption.append(new Option(service.name, service.id))
);

invoiceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log(
  //   serviceOption.value,
  //   quantity.valueAsNumber,
  //   services.find((service) => service.id == serviceOption.value)
  // );

  const selectedProduct = services.find(
    (service) => service.id == serviceOption.value
  );

  const isExistedProduct = [...lists.children].find(
    (el) => el.getAttribute("service-id") == selectedProduct.id
  );

  if (isExistedProduct) {
    const existedQuantity = isExistedProduct.querySelector(".quantity");
    const existedTotal = isExistedProduct.querySelector(".totalPrice");
    const existedPrice = isExistedProduct.querySelector(".price");
    existedQuantity.innerText =
      parseFloat(existedQuantity.innerText) + quantity.valueAsNumber;

    existedTotal.innerText = existedQuantity.innerText * selectedProduct.price;
  } else {
    lists.append(createTr(selectedProduct, quantity.valueAsNumber));
  }
  updateSubtotal();
  calcTax();
  updateTotal();
  invoiceForm.reset();
  showTable();
});

app.addEventListener("click", (event) => {
  const currentElement = event.target;
  // console.log(currentElement);
  if (currentElement.classList.contains("delBtn")) {
    currentElement.closest("tr").remove();
    updateSubtotal();
    calcTax();
    updateTotal();
    showTable();
  }
});

// openModalBtn.addEventListener("click", () => {
//   modal.classList.remove("d-none");
// });

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("d-none");
});

modalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const id = Date.now();
  services.push({
    id,
    name: formData.get("serviceModalName"),
    price: formData.get("serviceModalPrice"),
  });
  serviceOption.append(new Option(formData.get("serviceModalName"), id));
  modal.classList.add("d-none");
});
