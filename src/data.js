export const seedData = {
  // Categories
  categories: [
    {
      _id: "68ae4984c4a0f68e60d36ab1",
      name: "رجال",
      slug: "men",
      description: "منتجات إسلامية للرجال",
      createdBy: "68ae28f942dc062465a079ca",
    },
    {
      _id: "68ae49bcc4a0f68e60d36ab3",
      name: "نساء",
      slug: "women",
      description: "منتجات إسلامية للنساء",
      createdBy: "68ae28f942dc062465a079ca",
    },
    {
      _id: "68ae4bbbcd0db2aea722543f",
      name: "مستلزمات",
      slug: "requirements",
      description: "المستلزمات الإسلامية والدينية",
      createdBy: "68ae28f942dc062465a079ca",
    },
  ],

  // SubCategories
  subCategories: [
    // Men subcategories
    {
      _id: "68ae4a4ac4a0f68e60d36ab7",
      name: "جلابية",
      slug: "jalabia",
      description: "جلاليب رجالية بتصاميم عصرية ومريحة",
      category: "68ae4984c4a0f68e60d36ab1",
    },
    {
      _id: "68ae4b24cd0db2aea7225434",
      name: "عباية",
      slug: "abaya",
      description: "عبايات رجالية فاخرة",
      category: "68ae4984c4a0f68e60d36ab1",
    },
    // Women subcategories
    {
      _id: "68ae4a5dc4a0f68e60d36ab9",
      name: "حجاب",
      slug: "hijab",
      description: "حجابات بأقمشة عالية الجودة وألوان متنوعة",
      category: "68ae49bcc4a0f68e60d36ab3",
    },
    {
      _id: "68ae4b7bcd0db2aea722543d",
      name: "خمار",
      slug: "khemar",
      description: "خمارات شرعية أنيقة ومريحة",
      category: "68ae49bcc4a0f68e60d36ab3",
    },
    // Requirements subcategories
    {
      _id: "68ae4bd2cd0db2aea7225441",
      name: "مصحف شريف",
      slug: "holy-quran",
      description: "مصاحف شريفة بطباعة فاخرة",
      category: "68ae4bbbcd0db2aea722543f",
    },
    {
      _id: "68ae4bfccd0db2aea7225443",
      name: "أدوات الصلاة",
      slug: "prayer",
      description: "سجادات صلاة ومستلزمات العبادة",
      category: "68ae4bbbcd0db2aea722543f",
    },
  ],

  // Products
  products: [
    // Men's Jalabia Products
    {
      name: "جلابية كتان بقبعة - أبيض",
      description:
        "جلابية رجالية من الكتان الطبيعي بتصميم عصري مع قبعة، مريحة ومناسبة للأجواء الحارة والمناسبات الدينية",
      price: 750,
      discount: 15,
      availableItems: 25,
      category: "68ae4984c4a0f68e60d36ab1",
      subCategory: "68ae4a4ac4a0f68e60d36ab7",
      createdBy: "68ae28f942dc062465a079ca",
      status: "new",
      defaultImage: {
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop",
        id: "men_jalabia_white_01",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop",
          id: "men_jalabia_white_01_1",
        },
        {
          url: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500&h=600&fit=crop",
          id: "men_jalabia_white_01_2",
        },
      ],
    },
    {
      name: "جلابية قطن مخلوط - بيج",
      description:
        "جلابية رجالية من القطن المخلوط بألوان هادئة، مناسبة للاستخدام اليومي والصلاة",
      price: 500,
      discount: 10,
      availableItems: 30,
      category: "68ae4984c4a0f68e60d36ab1",
      subCategory: "68ae4a4ac4a0f68e60d36ab7",
      createdBy: "68ae28f942dc062465a079ca",
      status: "new",
      defaultImage: {
        url: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500&h=600&fit=crop",
        id: "men_jalabia_beige_01",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500&h=600&fit=crop",
          id: "men_jalabia_beige_01_1",
        },
      ],
    },

    // Men's Abaya Products
    {
      name: "عباية رجالية فاخرة - أسود",
      description:
        "عباية رجالية من الصوف الفاخر بتطريز ذهبي، مناسبة للمناسبات الخاصة والأعياد",
      price: 1200,
      discount: 20,
      availableItems: 15,
      category: "68ae4984c4a0f68e60d36ab1",
      subCategory: "68ae4b24cd0db2aea7225434",
      createdBy: "68ae28f942dc062465a079ca",
      status: "new",
      defaultImage: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
        id: "men_abaya_black_01",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
          id: "men_abaya_black_01_1",
        },
        {
          url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=600&fit=crop",
          id: "men_abaya_black_01_2",
        },
      ],
    },

    // Women's Hijab Products
    {
      name: "حجاب قطني ناعم - وردي",
      description:
        "حجاب من القطن الناعم عالي الجودة، مريح ولا يسبب حساسية، متوفر بألوان متنوعة",
      price: 120,
      discount: 5,
      availableItems: 50,
      category: "68ae49bcc4a0f68e60d36ab3",
      subCategory: "68ae4a5dc4a0f68e60d36ab9",
      createdBy: "68ae28f942dc062465a079ca",
      status: "new",
      defaultImage: {
        url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=600&fit=crop",
        id: "women_hijab_pink_01",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=600&fit=crop",
          id: "women_hijab_pink_01_1",
        },
        {
          url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
          id: "women_hijab_pink_01_2",
        },
      ],
    },
    {
      name: "حجاب شيفون - أزرق سماوي",
      description:
        "حجاب من الشيفون الخفيف والأنيق، مناسب للمناسبات الخاصة ومقاوم للتجعد",
      price: 200,
      discount: 8,
      availableItems: 35,
      category: "68ae49bcc4a0f68e60d36ab3",
      subCategory: "68ae4a5dc4a0f68e60d36ab9",
      createdBy: "68ae28f942dc062465a079ca",
      status: "new",
      defaultImage: {
        url: "https://images.unsplash.com/photo-1616847810871-1da60dc1a267?w=500&h=600&fit=crop",
        id: "women_hijab_blue_01",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1616847810871-1da60dc1a267?w=500&h=600&fit=crop",
          id: "women_hijab_blue_01_1",
        },
      ],
    },

    // Women's Khemar Products
    {
      name: "خمار طويل شرعي - أسود",
      description:
        "خمار شرعي طويل يغطي الصدر، من القماش المبطن عالي الجودة، مريح وعملي للاستخدام اليومي",
      price: 300,
      discount: 12,
      availableItems: 20,
      category: "68ae49bcc4a0f68e60d36ab3",
      subCategory: "68ae4b7bcd0db2aea722543d",
      createdBy: "68ae28f942dc062465a079ca",
      status: "new",
      defaultImage: {
        url: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=500&h=600&fit=crop",
        id: "women_khemar_black_01",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=500&h=600&fit=crop",
          id: "women_khemar_black_01_1",
        },
        {
          url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop",
          id: "women_khemar_black_01_2",
        },
      ],
    },

    // Holy Quran Products
    {
      name: "مصحف شريف - مصحف المدينة",
      description:
        "مصحف شريف بطبعة المدينة المنورة، بخط النسخ الواضح وغلاف جلدي فاخر مع علبة هدايا",
      price: 450,
      discount: 0,
      availableItems: 40,
      category: "68ae4bbbcd0db2aea722543f",
      subCategory: "68ae4bd2cd0db2aea7225441",
      createdBy: "68ae28f942dc062465a079ca",
      status: "new",
      defaultImage: {
        url: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=500&h=600&fit=crop",
        id: "quran_medina_01",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=500&h=600&fit=crop",
          id: "quran_medina_01_1",
        },
        {
          url: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&h=600&fit=crop",
          id: "quran_medina_01_2",
        },
      ],
    },
    {
      name: "مصحف جيب صغير",
      description:
        "مصحف صغير الحجم مناسب للحمل في الجيب أو الحقيبة، بطباعة واضحة وغلاف مقوى",
      price: 80,
      discount: 0,
      availableItems: 60,
      category: "68ae4bbbcd0db2aea722543f",
      subCategory: "68ae4bd2cd0db2aea7225441",
      createdBy: "68ae28f942dc062465a079ca",
      status: "new",
      defaultImage: {
        url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=600&fit=crop",
        id: "quran_pocket_01",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=600&fit=crop",
          id: "quran_pocket_01_1",
        },
      ],
    },

    // Prayer Products
    {
      name: "سجادة صلاة فاخرة - تصميم المسجد النبوي",
      description:
        "سجادة صلاة من الصوف الطبيعي بتصميم المسجد النبوي الشريف، ناعمة ومريحة مع حقيبة حمل",
      price: 350,
      discount: 15,
      availableItems: 25,
      category: "68ae4bbbcd0db2aea722543f",
      subCategory: "68ae4bfccd0db2aea7225443",
      createdBy: "68ae28f942dc062465a079ca",
      status: "new",
      defaultImage: {
        url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&h=600&fit=crop",
        id: "prayer_rug_nabawi_01",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&h=600&fit=crop",
          id: "prayer_rug_nabawi_01_1",
        },
        {
          url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=500&h=600&fit=crop",
          id: "prayer_rug_nabawi_01_2",
        },
      ],
    },
    {
      name: "مسبحة خشبية طبيعية",
      description:
        "مسبحة من الخشب الطبيعي المصقول بعناية، 99 حبة مع فاصل، مريحة للاستخدام في التسبيح والذكر",
      price: 150,
      discount: 0,
      availableItems: 45,
      category: "68ae4bbbcd0db2aea722543f",
      subCategory: "68ae4bfccd0db2aea7225443",
      createdBy: "68ae28f942dc062465a079ca",
      status: "new",
      defaultImage: {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
        id: "tasbih_wood_01",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
          id: "tasbih_wood_01_1",
        },
        {
          url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop",
          id: "tasbih_wood_01_2",
        },
      ],
    },
    {
      name: "قبلة إلكترونية ذكية",
      description:
        "جهاز إلكتروني ذكي لتحديد اتجاه القبلة مع مواقيت الصلاة والتقويم الهجري، شاشة LCD واضحة",
      price: 800,
      discount: 25,
      availableItems: 15,
      category: "68ae4bbbcd0db2aea722543f",
      subCategory: "68ae4bfccd0db2aea7225443",
      createdBy: "68ae28f942dc062465a079ca",
      status: "new",
      defaultImage: {
        url: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=500&h=600&fit=crop",
        id: "qibla_electronic_01",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=500&h=600&fit=crop",
          id: "qibla_electronic_01_1",
        },
      ],
    },
  ],
};

// Helper function to create seeder
export const seedDatabase = async () => {
  try {
    // Import your models here
    const Category = (await import("./models/Category.js")).default;
    const SubCategory = (await import("./models/subCategory.js")).default;
    const Product = (await import("./models/Products.js")).default;

    // Clear existing data (optional)
    await Category.deleteMany({});
    await SubCategory.deleteMany({});
    await Product.deleteMany({});

    // Seed categories
    await Category.insertMany(seedData.categories);
    console.log("✅ Categories seeded successfully");

    // Seed subcategories
    await SubCategory.insertMany(seedData.subCategories);
    console.log("✅ SubCategories seeded successfully");

    // Seed products
    await Product.insertMany(seedData.products);
    console.log("✅ Products seeded successfully");

    console.log("🎉 Database seeded successfully with Islamic products!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};
