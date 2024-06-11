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
            }
        ]
    }
]