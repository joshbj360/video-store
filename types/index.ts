export interface Profile {
    id: string;
    email: string;
    role: string;
    avatar: string | null;
    username: string | null;
    created_at: Date;
    updated_at: Date;
    products: Product[];
    likes: Like[];
    shares: Share[];
    socialMedia: SocialMediaInfo[];
    sellerProfile: SellerProfile | null;
    reviews: Review[];
    notifications: Notification[];
}

export interface SellerProfile {
    id: string;
    profileId: string;
    profile: Profile;
    store_name: string | null;
    store_description: string | null;
    store_logo: string | null;
    store_banner: string | null;
    store_location: string | null;
    store_phone: string | null;
    store_website: string | null;
    store_socials: any | null;
    is_verified: boolean;
    verification_status: VerificationStatus;
    verification_reason: string | null;
    created_at: Date;
    updated_at: Date;
    verificationDocuments: VerificationDocument[];
    reviews: Review[];
}

export interface VerificationDocument {
    id: string;
    sellerProfileId: string;
    sellerProfile: SellerProfile;
    type: string;
    url: string;
    status: VerificationStatus;
    created_at: Date;
    updated_at: Date;
}

export interface Review {
    id: string;
    userId: string;
    productId: number;
    sellerProfileId: string;
    rating: number;
    comment: string | null;
    created_at: Date;
    user: Profile;
    product: Product;
    sellerProfile: SellerProfile;
    notifications: Notification[];
}

export interface Product {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    stock: number | null;
    discount: number | null;
    measurement: Measurement | null;
    sizes: string[];
    status: ProductStatus | null;
    category: ProductCategory[];
    tags: ProductTag[];
    media: Media[];
    orderItem: OrderItem[];
    likes: Like[];
    share: Share[];
    socialMedia: SocialMediaInfo[];
    sellerId: string;
    store_name: string;
    seller: Profile;
    created_at: Date;
    updated_at: Date;
    reviews: Review[];
    notifications: Notification[];
}

export interface Measurement {
    id: number;
    product: Product | null;
    productId: number | null;
    weight: number | null;
    length: number | null;
    width: number | null;
    height: number | null;
}

export interface Media {
    id: number;
    url: string;
    type: MediaType;
    product: Product;
    productId: number;
    created_at: Date;
}

export interface Category {
    id: number;
    name: string;
    products: ProductCategory[];
    thumbnailCatUrl: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface ProductCategory {
    product: Product;
    productId: number;
    category: Category;
    categoryId: number;
}

export interface Tag {
    id: number;
    name: string;
    products: ProductTag[];
    created_at: Date;
    updated_at: Date;
}

export interface ProductTag {
    product: Product;
    productId: number;
    tag: Tag;
    tagId: number;
}

export interface Order {
    id: number;
    userId: string;
    stripeId: string;
    name: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
    orderItem: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    created_at: Date;
    updated_at: Date;
    notifications: Notification[];
}

export interface OrderItem {
    id: number;
    order: Order;
    orderId: number;
    product: Product;
    productId: number;
    quantity: number;
    created_at: Date;
}

export interface Address {
    id: number;
    userId: string;
    name: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
    created_at: Date;
    updated_at: Date;
}

export interface Like {
    id: number;
    userId: string;
    productId: number;
    product: Product;
    profile: Profile;
    created_at: Date;
}

export interface Share {
    id: number;
    userId: string;
    productId: number;
    platform: string | null;
    shareUrl: string | null;
    product: Product;
    profile: Profile;
    created_at: Date;
}

export interface SocialMediaInfo {
    id: number;
    userId: string | null;
    productId: number | null;
    platform: string;
    handle: string;
    product: Product | null;
    profile: Profile | null;
    created_at: Date;
}

export interface Notification {
    id: number;
    userId: string;
    message: string;
    type: NotificationType;
    read: boolean;
    orderId: number | null;
    reviewId: string | null;
    productId: number | null;
    created_at: Date;
    updated_at: Date;
    profile: Profile;
    order: Order | null;
    review: Review | null;
    product: Product | null;
}

export enum ProductStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED",
}

export enum MediaType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
}

export enum OrderStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}

export enum VerificationStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED",
}

export enum NotificationType {
    ORDER = "ORDER",
    REVIEW = "REVIEW",
    PRODUCT = "PRODUCT",
    GENERAL = "GENERAL",
}
