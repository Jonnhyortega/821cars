import { stock } from "@/data/stock";
import AutoDetailClient from "./AutoDetailClient";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const auto = stock.find((a) => a.id === Number(id));

  if (!auto) {
    return {
      title: "Vehículo no encontrado | 821 Cars",
      description: "El vehículo consultado no se encuentra disponible en 821 Cars.",
    };
  }

  const title = `${auto.marca} ${auto.model} ${auto.version ? auto.version + " " : ""}(${auto.año}) - 821 Cars`;
  const precioFormateado = auto.precio > 0 
    ? auto.moneda === "usd" 
      ? `USD $ ${auto.precio.toLocaleString("es-AR")}` 
      : `$ ${auto.precio.toLocaleString("es-AR")}`
    : "Consultar";

  const description = `${auto.marca} ${auto.model} ${auto.año} - ${auto.km} KM. Motor ${auto.motor || "Nafta"}. Precio: ${precioFormateado}. ¡Consultá ahora en 821 Cars!`;
  
  // Usar miniatura recortada o la primera foto de la galería o el logo oficial
  const imagePreview = auto.miniatura || (auto.imgs && auto.imgs[0]) || "https://res.cloudinary.com/do87isqjr/image/upload/v1789487738/Gemini_Generated_Image_29rjyv29rjyv29rj_cg2onb.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "821 Cars Automotors",
      images: [
        {
          url: imagePreview,
          width: 1200,
          height: 630,
          alt: `${auto.marca} ${auto.model}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePreview],
    },
  };
}

export default async function AutoPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const auto = stock.find((a) => a.id === Number(id));

  return <AutoDetailClient auto={auto} />;
}
