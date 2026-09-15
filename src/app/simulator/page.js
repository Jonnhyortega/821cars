"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import WhatsAppButton from "../components/whatsappButton";
import { DollarSign, Banknote, Calculator, Copy, CheckCircle2, Sparkles, RefreshCw, X, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Función de consulta a la API de Cotización del Dólar (DolarApi)
async function obtenerCotizacionDolar() {
  try {
    const res = await fetch("https://dolarapi.com/v1/dolares/blue", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error al consultar DolarApi");
    const data = await res.json();
    return data.venta || 1350; // Retorna la cotización de venta
  } catch (error) {
    console.warn("Error consultando API de dólar, usando cotización por defecto (1350):", error);
    return 1350; // Fallback razonable
  }
}

function simuladorEnPesos(precioARS, anticipoARS = 0) {
  const capitalAFinanciar = Math.max(0, precioARS - anticipoARS);
  const cuotasDisponibles = [60, 48, 36, 24, 12];
  
  const interesesARS = {
    60: 7_000_000,
    48: 6_500_000,
    36: 6_000_000,
    24: 5_500_000,
    12: 5_000_000,
  };

  return cuotasDisponibles.map((num) => {
    const totalConInteres = capitalAFinanciar + interesesARS[num];
    const valorCuotaNum = totalConInteres / num;
    const valorCuota = valorCuotaNum.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return { num, valorCuota, valorCuotaNum };
  });
}

function mostrarFechaHoraArgentina() {
  const opciones = {
    timeZone: "America/Argentina/Buenos_Aires",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date().toLocaleString("es-AR", opciones);
}

export default function SimulatorPage() {
  const [monedaPrecio, setMonedaPrecio] = useState("USD"); // 'ARS' | 'USD'
  const [precioInput, setPrecioInput] = useState("");
  const [anticipoInputARS, setAnticipoInputARS] = useState(""); // Siempre en ARS
  const [resultado, setResultado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState(false);

  const handleNumericChange = (setter) => (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setter(rawValue);
  };

  const formatPrecioInput = (value) => {
    if (!value) return "";
    const number = Number(value);
    if (monedaPrecio === "USD") {
      return `USD $ ${number.toLocaleString("es-AR")}`;
    }
    return `$ ${number.toLocaleString("es-AR")}`;
  };

  const formatAnticipoARS = (value) => {
    if (!value) return "";
    return `$ ${Number(value).toLocaleString("es-AR")}`;
  };

  const handleSimular = async () => {
    try {
      setLoading(true);
      setError("");

      const precioIngresado = Number(precioInput);
      const anticipoARS = Number(anticipoInputARS) || 0;

      if (!precioIngresado || precioIngresado <= 0) {
        setError("Por favor ingresá un precio válido para el vehículo.");
        setLoading(false);
        return;
      }

      let cotizacionDolar = 1;
      let precioARS = precioIngresado;

      if (monedaPrecio === "USD") {
        // Consultar API de conversión
        cotizacionDolar = await obtenerCotizacionDolar();
        precioARS = precioIngresado * cotizacionDolar;
      }

      // Calcular todas las cuotas en PESOS (ARS)
      const opciones = simuladorEnPesos(precioARS, anticipoARS);
      const fecha = mostrarFechaHoraArgentina();

      setResultado({
        precioOriginal: precioIngresado,
        monedaPrecio,
        cotizacionDolar,
        precioARS,
        anticipoARS,
        opciones,
        fecha,
      });
      setShowModal(true);
    } catch (err) {
      setError("Error al calcular la simulación. Verificá los valores ingresados.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopiarTexto = async () => {
    if (!resultado) return;

    const textoPrecioOriginal = resultado.monedaPrecio === "USD" 
      ? `USD $ ${resultado.precioOriginal.toLocaleString("es-AR")}` 
      : `$ ${resultado.precioOriginal.toLocaleString("es-AR")}`;

    const textoPrecioARS = `$ ${resultado.precioARS.toLocaleString("es-AR")}`;
    const textoAnticipo = `$ ${resultado.anticipoARS.toLocaleString("es-AR")}`;

    let texto = `🚘 *PROPUESTA DE FINANCIACIÓN - 821 CARS*\n\n` +
      `• *Precio Vehículo:* ${textoPrecioOriginal}`;

    if (resultado.monedaPrecio === "USD") {
      texto += ` (Cotización USD: $${resultado.cotizacionDolar.toLocaleString("es-AR")} -> Total ${textoPrecioARS} ARS)`;
    }

    texto += `\n• *Anticipo Aplicado:* ${textoAnticipo} ARS\n\n` +
      `*Planes de Cuotas en Pesos (ARS):*\n` +
      resultado.opciones
        .map((op) => `• ${op.num} cuotas de $ ${op.valorCuota} ARS`)
        .join("\n") +
      `\n\n_Cotización generada el ${resultado.fecha}_`;

    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch (err) {
      console.error("Error al copiar al portapapeles:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* 🔹 Navbar */}
      <div className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <Navbar />
      </div>

      <main className="pt-28 pb-20 px-4 flex flex-col items-center">
        <div className="max-w-3xl w-full">
          
          {/* Header */}
          <div className="text-center mb-10 space-y-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest"
            >
              <Calculator className="w-4 h-4" /> Herramienta Comercial 821 Cars
            </motion.div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              Simulador de <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Financiación</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Si ingresás el precio en dólares, el sistema consulta la cotización en tiempo real y calcula automáticamente todas las cuotas en pesos (ARS).
            </p>
          </div>

          {/* Tarjeta Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* 🔹 Selector de Moneda del Precio del Auto */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 text-center sm:text-left">
                Moneda del Precio del Vehículo
              </label>
              
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-secondary/60 rounded-2xl border border-border">
                <button
                  type="button"
                  onClick={() => setMonedaPrecio("USD")}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                    monedaPrecio === "USD"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <DollarSign className="w-4 h-4" /> Precio en Dólares (USD)
                </button>

                <button
                  type="button"
                  onClick={() => setMonedaPrecio("ARS")}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                    monedaPrecio === "ARS"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Banknote className="w-4 h-4" /> Precio en Pesos (ARS)
                </button>
              </div>
            </div>

            {/* 🔹 Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Precio Vehículo */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Precio del Vehículo ({monedaPrecio})
                </label>
                <input
                  type="text"
                  value={formatPrecioInput(precioInput)}
                  onChange={handleNumericChange(setPrecioInput)}
                  placeholder={monedaPrecio === "USD" ? "Ej: USD $ 9.000" : "Ej: $ 15.000.000"}
                  className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-foreground font-semibold placeholder:text-muted-foreground transition-all"
                />
              </div>

              {/* Anticipo (SIEMPRE EN PESOS ARS) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Anticipo / Entrega
                  </label>
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                    PESOS (ARS)
                  </span>
                </div>
                <input
                  type="text"
                  value={formatAnticipoARS(anticipoInputARS)}
                  onChange={handleNumericChange(setAnticipoInputARS)}
                  placeholder="Ej: $ 720.000 ARS"
                  className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-foreground font-semibold placeholder:text-muted-foreground transition-all"
                />
              </div>
            </div>

            {/* 🔹 Botón Simular */}
            <button
              onClick={handleSimular}
              disabled={loading || !precioInput}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/25 transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" /> Obteniendo cotización de Dólar & Calculando...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Calcular Cuotas en Pesos (ARS)
                </>
              )}
            </button>

            {error && <p className="text-red-500 text-sm font-semibold mt-4 text-center">{error}</p>}
          </motion.div>
        </div>
      </main>

      {/* 🔹 OVERLAY / MODAL DE CUOTAS EN PESOS */}
      <AnimatePresence>
        {showModal && resultado && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Fondo oscuro traslúcido */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Contenido del Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight">
                      Propuesta de Financiación
                    </h2>
                    <p className="text-xs text-muted-foreground">821 Cars • {resultado.fecha}</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-9 h-9 rounded-full bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto py-6 space-y-6 pr-1 custom-scrollbar">
                {/* Resumen & Cotización */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-secondary/50 border border-border">
                  <div>
                    <span className="text-xs text-muted-foreground font-semibold uppercase block">Precio del Vehículo</span>
                    <span className="text-xl font-black text-foreground">
                      {resultado.monedaPrecio === "USD" ? `USD $ ${resultado.precioOriginal.toLocaleString("es-AR")}` : `$ ${resultado.precioOriginal.toLocaleString("es-AR")} ARS`}
                    </span>
                    {resultado.monedaPrecio === "USD" && (
                      <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold mt-1">
                        <TrendingUp className="w-3.5 h-3.5" /> Cotización Dólar: ${resultado.cotizacionDolar.toLocaleString("es-AR")}
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground font-semibold uppercase block">Anticipo (Pesos ARS)</span>
                    <span className="text-xl font-black text-blue-500">
                      $ {resultado.anticipoARS.toLocaleString("es-AR")} ARS
                    </span>
                  </div>
                </div>

                {/* Grilla de Cuotas EN PESOS */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Planes de Cuotas Disponibles en Pesos (ARS)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {resultado.opciones.map((op) => (
                      <div
                        key={op.num}
                        className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-card to-blue-500/5 border border-blue-500/20 flex flex-col justify-center items-center text-center shadow-sm"
                      >
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                          Plan {op.num} Meses
                        </span>
                        <span className="text-xl font-black text-foreground">
                          {op.num} cuotas de $ {op.valorCuota} ARS
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Modal: Botón Copiar */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleCopiarTexto}
                  className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold text-sm shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  {copiado ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copiado ? "¡Copiado al Portapapeles!" : "Copiar propuesta para cliente"}
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-secondary hover:bg-muted text-foreground font-semibold text-sm transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <WhatsAppButton />
    </div>
  );
}
