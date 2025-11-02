export const properties = {
    //-------------------------------VENTA--------------------------------
  venta: [
    {
      id: 1,
      title: "Casa Moderna en Centro",
      location: "Centro, Río Cuarto",
      address: "Av. San Martín 1234",
      type: "venta",
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      price: 250000,
      description: "Hermosa casa moderna en el corazón de la ciudad, con amplios espacios y terminaciones de primera calidad. Cuenta con living comedor, cocina integrada, tres dormitorios (suite principal), dos baños completos, patio y cochera.",
      amenities: ["Cochera", "Patio", "Balcón", "Amoblada", "Jardín"],
      images: [
        "/dpto1/dpto1.jpg",
        "/dpto1/dpto2.jpg",
        "/dpto1/dpto3.jpg"
      ]
    },
    {
      id: 2,
      title: "Casa Quinta con Piscina",
      location: "Este, Río Cuarto",
      address: "Camino a las Cascadas 567",
      type: "venta",
      bedrooms: 4,
      bathrooms: 3,
      area: 300,
      price: 400000,
      originalPrice: "$ 400.000",
      description: "Impresionante casa quinta con amplios jardines y piscina. Ideal para disfrutar del aire libre y la naturaleza sin alejarse de la ciudad. Consta de amplio living, comedor diario y de recepción, cocina con comedor auxiliar, cuatro dormitorios en suite, tres baños, galería cubierta con parrilla y quincho.",
      amenities: ["Piscina", "Quincho", "Parrilla", "Jardín", "Cochera para 3 autos"],
      images: [
        "/dpto2/dpto.jpg",
        "/dpto2/dpto2.jpg",
        "/dpto2/dpto3.jpg"
      ]
    },
    {
      id: 3,
      title: "Local Comercial Céntrico",
      location: "Centro, Río Cuarto",
      address: "Av. Roca 789",
      type: "venta",
      bedrooms: 0,
      bathrooms: 1,
      area: 120,
      price: 300000,
      description: "Local comercial en pleno centro de la ciudad, con excelente visibilidad y alto tránsito de personas. Ideal para negocio de indumentaria, calzado o accesorios. Cuenta con baño, depósito y instalaciones eléctricas en perfecto estado.",
      amenities: ["Baño", "Depósito", "Aire acondicionado", "Vidriera", "Iluminación LED"],
      images: [
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1601760561441-16420502c7e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      ]
    },
    {
      id: 4,
      title: "Casa Familiar con Jardín",
      location: "Oeste, Río Cuarto",
      address: "Barrio Alberdi 321",
      type: "venta",
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      price: 450000,
      originalPrice: "$ 310.000",
      description: "Acogedora casa familiar en barrio residencial, con amplio jardín y parrilla. Perfecta para familias que buscan tranquilidad y espacios verdes. Posee living comedor, cocina comedor diario, tres dormitorios, dos baños, lavadero, galería cubierta y parrilla.",
      amenities: ["Jardín", "Parrilla", "Galería", "Cochera cubierta", "Lavadero"],
      images: [
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=784&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      ]
    }
  ],

  //-------------------------------ALQUILER--------------------------------
  alquiler: [
    {
      id: 101,
      title: "Departamento en Norte",
      location: "Norte, Río Cuarto",
      address: "Barrio Jardín 567",
      type: "alquiler",
      bedrooms: 2,
      bathrooms: 1,
      area: 80,
      price: 250000,
      description: "Acogedor departamento en zona residencial, cercano a centros comerciales y transporte público. Ideal para estudiantes o profesionales. Incluye servicios básicos y acceso a áreas comunes.",
      amenities: ["Amoblado", "Servicios incluidos", "Seguridad 24hs", "Lavandería"],
      images: [
        "/local/local1.jpg",
        "/local/local2.jpg",
        "/local/local3.jpg",
        "/local/local4.jpg",
        "/local/local5.jpg",

      ]
    },
    {
      id: 102,
      title: "Departamento Amueblado",
      location: "Sur, Río Cuarto",
      address: "Barrio Hipódromo 890",
      type: "alquiler",
      bedrooms: 1,
      bathrooms: 1,
      area: 50,
      price: "$ 18.000/mes",
      description: "Departamento completamente amueblado y equipado, listo para habitar. Ubicado en zona tranquila pero con fácil acceso al centro. Ideal para una persona o pareja.",
      amenities: ["Amoblado", "Cocina equipada", "Calefacción", "Internet incluido", "TV por cable"],
      images: [
        "/dpto1/dpto1.jpg",
        "https://images.unsplash.com/photo-1493663284031-b7e3aaa4c4b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
      ]
    },
    {
      id: 103,
      title: "Casa en Barrio Cerrado",
      location: "Norte, Río Cuarto",
      address: "Barrio Privado Los Olivos 123",
      type: "alquiler",
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      price: "$ 35.000/mes",
      description: "Hermosa casa en barrio privado con seguridad 24hs, pileta comunitaria y canchas de deportes. Espacios amplios y luminosos, con jardín propio y cochera cubierta.",
      amenities: ["Seguridad 24hs", "Pileta comunitaria", "Canchas deportivas", "Jardín", "Cochera"],
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      ] 
    }
  ],

  //-------------------------------TEMPORAL--------------------------------

  temporal: [
    {
      id: 201,
      title: "Cabaña con Piscina",
      location: "Sierras de Río Cuarto",
      address: "Ruta 8, Km 12",
      type: "temporal",
      bedrooms: 2,
      bathrooms: 1,
      area: 100,
      price: 1300000,
      description: "Encantadora cabaña para escapadas de fin de semana o vacaciones. Rodeada de naturaleza pero con todas las comodidades. Incluye piscina, parrilla y acceso directo a senderos.",
      amenities: ["Piscina", "Parrilla", "Wi-Fi", "TV por cable", "Estacionamiento"],
      images: [
        "/duplex/duplex1.jpg",
        "/duplex/duplex2.jpg",
        "/duplex/duplex3.jpg",
      ]
    },
    {
      id: 202,
      title: "Departamento en Complejo Turístico",
      location: "Villa General Belgrano",
      address: "Av. del Libertador 456",
      type: "temporal",
      bedrooms: 2,
      bathrooms: 1,
      area: 70,
      price: "$ 30.000/fin de semana",
      description: "Departamento en complejo turístico con pileta, solárium y actividades recreativas. A pocos minutos del centro y de los principales atractivos turísticos. Ideal para escapadas románticas o en familia.",
      amenities: ["Pileta", "Solárium", "Wi-Fi", "Cocina equipada", "Estacionamiento"],
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      ]
    },
    {
      id: 203,
      title: "Casa de Campo",
      location: "Sierras de Córdoba",
      address: "Ruta 5, Km 45",
      type: "temporal",
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      price: "$ 60.000/semana",
      description: "Amplia casa de campo con vistas panorámicas a las sierras. Perfecta para desconectar y disfrutar de la naturaleza. Incluye parrilla, horno de barro y amplios espacios al aire libre.",
      amenities: ["Parrilla", "Horno de barro", "Amplio terreno", "Vistas panorámicas", "Estacionamiento"],
      images: [
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
      ]
    }
  ]
};



export const featuredProperties = [
  properties.venta[0],
  properties.alquiler[0],
  properties.temporal[0],
  properties.venta[1]
];