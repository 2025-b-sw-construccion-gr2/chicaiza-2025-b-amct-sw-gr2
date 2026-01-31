import csv
import statistics
import matplotlib.pyplot as plt
import os

# =========================
# LECTURA DEL ARCHIVO CSV
# =========================

# Obtener la ruta del directorio donde está el script
script_dir = os.path.dirname(os.path.abspath(__file__))
archivo = os.path.join(script_dir, "notas_estudiantes.csv")
estudiantes = []

with open(archivo, newline='', encoding='utf-8') as f:
    lector = csv.DictReader(f)
    for fila in lector:
        fila["NotaPrimerBimestre"] = float(fila["NotaPrimerBimestre"])
        fila["NotaSegundoBimestre"] = float(fila["NotaSegundoBimestre"])
        fila["NotaTotal"] = float(fila["NotaTotal"])
        estudiantes.append(fila)


# =========================
# CÁLCULOS POR ESTUDIANTE
# =========================

print("PROMEDIOS Y PORCENTAJES POR ESTUDIANTE\n")

for e in estudiantes:
    promedio = (e["NotaPrimerBimestre"] + e["NotaSegundoBimestre"]) / 2
    porcentaje = (e["NotaTotal"] / 20) * 100

    print(f"{e['NombreApellido']}: "
          f"Promedio = {promedio:.2f}, "
          f"Porcentaje = {porcentaje:.2f}%")

# =========================
# MEDIDAS ESTADÍSTICAS
# =========================

notas_totales = [e["NotaTotal"] for e in estudiantes]

media = statistics.mean(notas_totales)
mediana = statistics.median(notas_totales)
moda = statistics.mode(notas_totales)

print("\nMEDIDAS ESTADÍSTICAS (Nota Total)")
print(f"Media: {media:.2f}")
print(f"Mediana: {mediana}")
print(f"Moda: {moda}")

# =========================
# NOTAS EXTREMAS
# =========================

primer_bimestre = [e["NotaPrimerBimestre"] for e in estudiantes]
segundo_bimestre = [e["NotaSegundoBimestre"] for e in estudiantes]

print("\nNOTAS EXTREMAS")
print(f"Máxima primer bimestre: {max(primer_bimestre)}")
print(f"Mínima primer bimestre: {min(primer_bimestre)}")
print(f"Máxima segundo bimestre: {max(segundo_bimestre)}")
print(f"Mínima segundo bimestre: {min(segundo_bimestre)}")
print(f"Nota total más alta: {max(notas_totales)}")
print(f"Nota total más baja: {min(notas_totales)}")

# =========================
# ANÁLISIS DE SENTIMIENTO
# =========================

categorias = {
    "excelente": 0,
    "muy bueno": 0,
    "bueno": 0,
    "normal": 0,
    "neutral": 0,
    "malo": 0,
    "pésimo": 0
}

for e in estudiantes:
    comentario = e["ComentarioEstudiante"].lower()

    if "excelente" in comentario or "perfecto" in comentario:
        categorias["excelente"] += 1
    elif "muy buena" in comentario or "me encantó" in comentario:
        categorias["muy bueno"] += 1
    elif "buena" in comentario or "me gustó" in comentario:
        categorias["bueno"] += 1
    elif "neutral" in comentario:
        categorias["neutral"] += 1
    elif "normal" in comentario or "regular" in comentario:
        categorias["normal"] += 1
    elif "no me gustó" in comentario or "aburrida" in comentario:
        categorias["malo"] += 1
    else:
        categorias["pésimo"] += 1

print("\nCLASIFICACIÓN DE COMENTARIOS")
for k, v in categorias.items():
    print(f"{k}: {v}")

# =========================
# GRÁFICO DE PASTEL
# =========================

labels = categorias.keys()
sizes = categorias.values()

plt.figure(figsize=(8,8))
plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
plt.title("Distribución de Comentarios de Estudiantes")
plt.show()
