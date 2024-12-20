
export const registerFormControls = [
    {
        name : "userName",
        label : "User Name",
        placeholder : "Enter your user name",
        componentType : 'input',
        type : 'text',
    },
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        componentType : 'input',
        type : 'email',
    },
    {
        name : "password",
        label : "password",
        placeholder : "Enter your password",
        componentType : 'input',
        type : 'password',
    }
]

export const loginFormControls = [
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        componentType : 'input',
        type : 'email',
    },
    {
        name : "password",
        label : "password",
        placeholder : "Enter your password",
        componentType : 'input',
        type : 'password',
    }
]

export const addProductFormElements = [
    {
        label : "Title",
        name : 'title',
        componentType : 'input',
        placeholder : 'Enter product title'
    },
    {
        label : 'Description',
        name : 'description',
        componentType : 'textarea',
        placeholder : 'Enter product Description'
    },
    {
        label : "Category",
        name : 'category',
        componentType : 'select',
        options : [
            {id : "men", label : "Men"},
            {id : "women", label : "Women"},
            {id : "kids", label : "Kids"},
            {id : "accessories", label : "Accessories"},
            {id : "footwear", label : "Footwear"},
        ],
    },
    {
        label : "Brand",
        name : 'brand',
        componentType : 'select',
        options : [
            {id : "nike", label : "Nike"},
            {id : "adidas", label : "Adidas"},
            {id : "puma", label : "Puma"},
            {id : "levi", label : "Levi's"},
            {id : "h&m", label : "H&M"},
            {id : "Other", label : "Other"}
        ],
    },
    {
        label : "Price",
        name : 'price',
        componentType : 'input',
        type : "number",
        placeholder : 'Enter product price'
    },
    {
        label : "Sale Price",
        name : 'salesPrice',
        componentType : 'input',
        type : "number",
        placeholder : 'Enter sale price (optional)'
    },
    {
        label : "Total Stock",
        name : 'totalStock',
        componentType : 'input',
        type : "number",
        placeholder : 'Enter total stock'
    },
]


export const shoppingViewHeaderMenuItems = [
    {
        id : 'home',
        label : 'Home',
        path : '/shop/home'
    },
    {
        id : 'search',
        label : 'Search',
        path : '/shop/search'
    },
    {
        id : 'men',
        label : 'Men',
        path : '/shop/listing'
    },
    {
        id : 'women',
        label : 'Women',
        path : '/shop/listing'
    },    
    {
        id : 'accessories',
        label : 'Accessories',
        path : '/shop/listing'
    }
]

export const filterOptions = {
    category : [
        {id : "men", label : "Men"},
        {id : "women", label : "Women"},
        {id : "accessories", label : "Accessories"},
        {id : "kids", label : "Kids"},
        {id : "footwear", label : "Footwear"},
    ],
    brand : [
        {id : "nike", label : "Nike"},
        {id : "adidas", label : "Adidas"},
        {id : "puma", label : "Puma"},
        {id : "levi", label : "Levi's"},
        {id : "h&m", label : "H&M"},
        {id : "Other", label : "Other"}
    ],
}

export const sortOptions = [
    {id : "price-lowtohigh", label : "Price Low to High"},
    {id : "price-hightolow", label : "Price High to Low"},
    {id : "title-atoz", label : "Title : A to Z"},
    {id : "title-ztoa", label : "Title : Z to A"},
    
];

export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];