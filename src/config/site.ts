export const SITE = {
  brandName: 'أركان',
  brandFullName: 'أركان لشراء الأثاث والأجهزة الكهربائية المستعملة في مصر',
  brandEn: 'ARKAN',
  domain: 'https://arkan-furniture.eg',
  // رقم تجريبي موحّد — عدّله هنا فقط ليتحدث في الموقع بالكامل
  phoneDisplay: '0100 000 0000',
  phoneHref: 'tel:+201000000000',
  whatsappNumber: '201000000000',
  email: 'info@arkan-furniture.eg',
  workingHours: 'يومياً من 8 صباحاً حتى 12 منتصف الليل',
  locationLabel: 'القاهرة • الجيزة • الإسكندرية • جميع محافظات مصر',
  defaultOgImage: '/images/hero-luxury-home.webp',
} as const;

export const IMG_DIMS: Record<string, { w: number; h: number }> = {
  '/images/hero-luxury-home.webp': { w: 1376, h: 768 },
  '/images/appliances-ac-tv.webp': { w: 1376, h: 768 },
  '/images/editorial-living.webp': { w: 896, h: 1200 },
  '/images/bedroom-suite.webp': { w: 896, h: 1200 },
  '/images/kitchen-appliances.webp': { w: 896, h: 1200 },
  '/images/egypt-architecture.webp': { w: 896, h: 1200 },
};

export function whatsappUrl(message = 'مرحباً أركان، أريد تقييم وبيع أثاث أو أجهزة كهربائية مستعملة'): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الأجهزة الكهربائية', href: '/buy-used-appliances' },
  { label: 'الأثاث والعفش', href: '/buy-full-apartment-furniture' },
  { label: 'المحافظات', href: '/coverage/cairo' },
  { label: 'المدونة والأسعار', href: '/blog' },
  { label: 'كيف نعمل', href: '/how-it-works' },
  { label: 'من نحن', href: '/about' },
  { label: 'تواصل معنا', href: '/contact' },
] as const;

export const APPLIANCE_BRANDS = [
  'شارب • Sharp',
  'كاريير • Carrier',
  'توشيبا • Toshiba',
  'كريازي • Kiriazi',
  'زانوسي • Zanussi',
  'يونيون إير • Unionaire',
  'فريش • Fresh',
  'سامسونج • Samsung',
  'إل جي • LG',
  'يونيفرسال • Universal',
  'أريستون • Ariston',
  'إيكيا • IKEA',
] as const;

export const FOOTER_COLUMNS = {
  furniture: [
    { label: 'شراء الأثاث المستعمل العام', href: '/' },
    { label: 'شراء غرف النوم والمراتب', href: '/buy-used-bedrooms' },
    { label: 'شراء الأنتريهات والصالونات والسفرة', href: '/buy-used-living-dining' },
    { label: 'شراء المطابخ والسجاد والأنتيكات', href: '/buy-used-kitchens-carpets-antiques' },
    { label: 'تصفية شقق وعفش بيت كامل', href: '/buy-full-apartment-furniture' },
    { label: 'شراء الأثاث المكتبي والفندقي', href: '/buy-used-office-furniture' },
  ],
  appliances: [
    { label: 'شراء الأجهزة الكهربائية العام', href: '/buy-used-appliances' },
    { label: 'شراء التكييفات والمكيفات المستعملة', href: '/buy-used-ac' },
    { label: 'شراء الثلاجات والديب فريزر', href: '/buy-used-fridges' },
    { label: 'شراء الغسالات وغسالات الأطباق', href: '/buy-used-washers' },
    { label: 'شراء البوتاجازات والأفران والسخانات', href: '/buy-used-stoves-heaters' },
    { label: 'شراء الشاشات والميكروويف والأجهزة الصغيرة', href: '/buy-used-tvs-small-appliances' },
  ],
  coverageAndGuides: [
    { label: 'شراء أثاث مستعمل في القاهرة', href: '/coverage/cairo' },
    { label: 'شراء أثاث مستعمل في الجيزة وأكتوبر', href: '/coverage/giza' },
    { label: 'شراء أثاث مستعمل في الإسكندرية', href: '/coverage/alexandria' },
    { label: 'تغطية الدلتا والقناة والصعيد', href: '/coverage/egypt-governorates' },
    { label: 'دليل أسعار الأثاث المستعمل في مصر', href: '/blog/used-furniture-prices-egypt' },
    { label: 'دليل أسعار التكييفات المستعملة', href: '/blog/used-ac-prices-egypt' },
    { label: 'أسواق الأثاث المستعمل (سوق التونسي)', href: '/blog/used-furniture-markets-egypt' },
  ],
} as const;
