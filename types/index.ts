export interface NavigationTile {
    title: string;
    icon: string;
    link: string;
}

export interface MenuItem {
    label: string;
    href: string;
}

// Shared types
export interface GalleryImage {
    id?: number;
    category: string;
    image: string;
    caption?: string;
    createdAt?: string;
    updatedAt?: string;
}