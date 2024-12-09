export class MenuModel {
    name: string = "";
    icon: string = "";
    url: string = "";
    isTitle:boolean = false;
    subMenus: MenuModel[] = [];
}

export const Menus: MenuModel[] = [
    {
        name: "Ana Sayfa",
        icon: "fas fa-solid fa-home",
        url: "/",
        isTitle: false,
        subMenus: []
    },
    {
        name: "Ana Grup",
        icon: "fa-solid fa-layer-group",
        url: "",
        isTitle: false,
        subMenus: [
            {
                name: " Müşteriler",
                icon: "fa fa-users me-2",
                url: "/customers",
                isTitle: false,
                subMenus: []
            },
            {
                name: " Depolar",
                icon: "fa-solid fa-warehouse me-2",
                url: "/depots",
                isTitle: false,
                subMenus: []
            },
            {
                name: " Ürünler",
                icon: "fa-solid fa-boxes-stacked me-2",
                url: "/products",
                isTitle: false,
                subMenus: []
            },
            {
                name: " Reçeteler",
                icon: "fa-solid fa-boxes-packing me-2",
                url: "/recipes",
                isTitle: false,
                subMenus: []
            }
        ]
    },
    {
        name: "Siparişler",
        icon: "fa fa-solid fa-clipboard-list",
        url:"/orders",
        isTitle:false,
        subMenus:[]
    },
    {
        name: "Faturalar",
        icon: "fa fa-solid fa-file-invoice",
        url:"",
        isTitle:false,
        subMenus:[
            {
                name: " Alış Faturaları",
                icon: "fa fa-solid fa-file-invoice",
                url:"/invoices/1",
                isTitle:false,
                subMenus:[]
            },
            {
                name: " Satış Faturaları",
                icon: "fa fa-solid fa-file-invoice",
                url:"/invoices/2",
                isTitle:false,
                subMenus:[]
            }
        ]
    }
]