import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { DivIcon } from "leaflet";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MapPin } from "lucide-react";

// Fix leaflet default icon issue in Vite
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

type Property = {
  id: number;
  lat: number;
  lng: number;
  title: string;
  titleDE: string;
  price: string;
  area: number;
  location: string;
  image: string;
  type: string;
};

const properties: Property[] = [
  {
    id: 1,
    lat: 42.6629,
    lng: 21.1655,
    title: "Tokë Bujqësore në Prishtinë",
    titleDE: "Ackerland in Pristina",
    price: "€150/muaj",
    area: 2.5,
    location: "Prishtinë",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    type: "Bujqësi",
  },
  {
    id: 2,
    lat: 42.2139,
    lng: 20.7397,
    title: "Parcelë Komerciale në Prizren",
    titleDE: "Gewerbepark in Prizren",
    price: "€450/muaj",
    area: 1.2,
    location: "Prizren",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    type: "Komercial",
  },
  {
    id: 3,
    lat: 42.6590,
    lng: 20.2878,
    title: "Tokë me Pemëtore në Pejë",
    titleDE: "Obstgarten in Peja",
    price: "€200/muaj",
    area: 4.0,
    location: "Pejë",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=800&q=80",
    type: "Bujqësi",
  },
  {
    id: 4,
    lat: 42.4636,
    lng: 21.4694,
    title: "Parcelë Industriale në Gjilan",
    titleDE: "Industriefläche in Gjilan",
    price: "€350/muaj",
    area: 3.0,
    location: "Gjilan",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    type: "Industrial",
  },
  {
    id: 5,
    lat: 42.3803,
    lng: 20.4308,
    title: "Vilë dhe Tokë në Gjakovë",
    titleDE: "Villa und Land in Gjakova",
    price: "€600/muaj",
    area: 0.8,
    location: "Gjakovë",
    image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80",
    type: "Rezidencial",
  },
];

// Custom red DivIcon marker
function createRedMarker() {
  return new DivIcon({
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: #E41E26;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 14px rgba(228, 30, 38, 0.6);
        cursor: pointer;
      "></div>
    `,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export function TokaMap() {
  const { t, language } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
    setSheetOpen(true);
  };

  const redMarker = createRedMarker();

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[42.6026, 20.9030]}
        zoom={8}
        style={{ width: "100%", height: "100%", background: "#0A0A0A" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.lat, property.lng]}
            icon={redMarker}
            eventHandlers={{
              click: () => handleMarkerClick(property),
            }}
          >
          </Marker>
        ))}
      </MapContainer>

      {/* Property count badge */}
      <div className="absolute top-4 left-4 z-[1000] bg-background/90 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-white text-sm font-medium">{properties.length} {t.propertyFound}</span>
      </div>

      {/* Property Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-[380px] sm:w-[420px] bg-[#171717] border-l border-white/10 p-0 overflow-y-auto"
        >
          {selectedProperty && (
            <>
              <div className="relative h-56 overflow-hidden">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded-md mb-2">
                    {selectedProperty.type}
                  </span>
                  <h2 className="text-xl font-display font-bold text-white leading-tight">
                    {language === "AL" ? selectedProperty.title : selectedProperty.titleDE}
                  </h2>
                </div>
              </div>
              
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-white/50 text-xs mb-1">{t.price}</p>
                    <p className="text-primary font-display font-bold text-lg">{selectedProperty.price}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-white/50 text-xs mb-1">{t.area}</p>
                    <p className="text-white font-bold text-lg">{selectedProperty.area} {t.hectares}</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <p className="text-white/50 text-xs">{t.location}</p>
                    <p className="text-white font-medium">{selectedProperty.location}</p>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20"
                  onClick={() => {
                    setSheetOpen(false);
                  }}
                >
                  {t.invest} →
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
