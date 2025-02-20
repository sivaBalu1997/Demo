export interface SideMenuInterface {
    name: string;
    /**
     * The path to the page that the menu item should link to.
     * If not provided, the item will not be a link.
     */
    path?: string;
    icon?: string;    
}