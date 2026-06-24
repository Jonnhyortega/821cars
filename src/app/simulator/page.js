"use client";

import { useState } from "react";


function simuladorEnPesos(carPriceARS, anticipo = 0) {
  const capitalAFinanciar = carPriceARS - anticipo;

  const cuotasDisponibles = [60, 48, 36, 24, 12];
  const intereses = {
    60: 7_000_000,
    48: 6_500_000,
    36: 6_000_000,
    24: 5_500_000,
    12: 5_000_000,
  };

  return cuotasDisponibles.map((num) => {
    const totalConInteres = capitalAFinanciar + intereses[num];
    const valorCuota = (totalConInteres / num).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return { num, valorCuota };
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
    second: "2-digit",
  };
  return new Date().toLocaleString("es-AR", opciones);
}

async function ejecutarSimulador(precioARS, anticipo = 0) {
  const opciones = simuladorEnPesos(precioARS, anticipo);
  const fecha = mostrarFechaHoraArgentina();

  return {
    precioARS,
    anticipo,
    opciones,
    fecha,
  };
}

export default function SimulatorPage() {
  const [precioARS, setPrecioARS] = useState("");
  const [anticipo, setAnticipo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState(false);

  const handleCurrencyChange = (setter) => (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setter(rawValue);
  };

  const formatCurrencyInput = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  const handleSimular = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await ejecutarSimulador(Number(precioARS), Number(anticipo));
      setResultado(data);
    } catch (err) {
      setError("Error al calcular la simulación. Verifica los valores ingresados.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopiarTexto = async () => {
    if (!resultado) return;
    const texto = `Con ${resultado.anticipo.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    })} de anticipo te quedarían las siguientes opciones de pago:\n\n${resultado.opciones
      .map((op) => `• ${op.num} cuotas de $${op.valorCuota}`)
      .join("\n")}`;

    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center py-20 px-4">
      <div className="max-w-3xl w-full bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">💰 Simulador de Financiación</h1>
        <p className="text-center text-gray-300 mb-8">
          Ingresá el valor del vehículo y el anticipo para obtener un plan de financiación actualizado.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm mb-2 text-gray-400">Precio del vehículo (ARS)</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formatCurrencyInput(precioARS)}
              onChange={handleCurrencyChange(setPrecioARS)}
              placeholder="Ej: $ 15.000.000"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-400">Anticipo (ARS)</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formatCurrencyInput(anticipo)}
              onChange={handleCurrencyChange(setAnticipo)}
              placeholder="Ej: $ 4.000.000"
            />
          </div>
        </div>

        {/* Botón principal */}
        <button
          onClick={handleSimular}
          disabled={loading || !precioARS}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg disabled:opacity-60"
        >
          {loading ? "Calculando..." : "Simular financiación"}
        </button>

        {/* Error */}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {/* Resultado */}
        {resultado && (
          <div className="mt-10 border-t border-gray-700 pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">📊 Resultado de la Simulación</h2>

            <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-700 space-y-2">
              <p>
                <span className="font-medium text-gray-400">💵 Valor del vehículo:</span>{" "}
                {resultado.precioARS.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
              </p>
              <p>
                <span className="font-medium text-gray-400">💰 Anticipo aplicado:</span>{" "}
                {resultado.anticipo.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
              </p>
              <p className="text-gray-400 text-sm mt-2">Última actualización: {resultado.fecha}</p>
            </div>

            {/* Opciones */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-center text-blue-400">
                Opciones de financiación:
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {resultado.opciones.map((op) => (
                  <div
                    key={op.num}
                    className="bg-gradient-to-r from-blue-600/20 to-blue-400/10 border border-blue-500/30 rounded-xl p-4 text-center"
                  >
                    <p className="text-xl font-semibold text-white">
                      {op.num} cuotas de ${op.valorCuota}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón Copiar */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleCopiarTexto}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 transition rounded-lg font-semibold"
              >
                📋 Copiar texto
              </button>
            </div>

            {/* Notificación */}
            {copiado && (
              <p className="text-center mt-4 text-green-400 animate-pulse">
                ✅ ¡Texto copiado al portapapeles!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
