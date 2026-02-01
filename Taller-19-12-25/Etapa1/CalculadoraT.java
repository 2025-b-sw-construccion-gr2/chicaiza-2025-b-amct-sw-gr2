import java.util.Scanner;

/**
 * Calculadora interactiva por consola
 * Operaciones: suma, resta, multiplicación, división y potencia
 * Incluye validaciones de entrada y mensajes de error claros
 */
public class CalculadoraT {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        boolean continuar = true;

        System.out.println("=================================");
        System.out.println("     CALCULADORA POR CONSOLA      ");
        System.out.println("=================================");

        while (continuar) {

            System.out.println("\nSeleccione una operación:");
            System.out.println("1. Suma");
            System.out.println("2. Resta");
            System.out.println("3. Multiplicación");
            System.out.println("4. División");
            System.out.println("5. Potencia");
            System.out.println("6. Salir");
            System.out.print("Opción: ");

            if (!sc.hasNextInt()) {
                System.out.println("❌ Error: Ingrese una opción válida.");
                try {
                    sc.next();
                } catch (java.util.NoSuchElementException e) {
                    System.out.println("❌ Error: No hay más entrada disponible.");
                    break;
                }
                continue;
            }

            int opcion = sc.nextInt();

            if (opcion == 6) {
                System.out.println("Gracias por usar la calculadora.");
                break;
            }

            // Validar opción
            if (opcion < 1 || opcion > 5) {
                System.out.println("❌ Error: Opción fuera de rango.");
                continue;
            }

            // Ingreso del primer número
            System.out.print("Ingrese el primer número: ");
            if (!sc.hasNextDouble()) {
                System.out.println("❌ Error: Debe ingresar un número válido.");
                try {
                    sc.next();
                } catch (java.util.NoSuchElementException e) {
                    System.out.println("❌ Error: No hay más entrada disponible.");
                    break;
                }
                continue;
            }
            double num1 = sc.nextDouble();

            // Ingreso del segundo número
            System.out.print("Ingrese el segundo número: ");
            if (!sc.hasNextDouble()) {
                System.out.println("❌ Error: Debe ingresar un número válido.");
                try {
                    sc.next();
                } catch (java.util.NoSuchElementException e) {
                    System.out.println("❌ Error: No hay más entrada disponible.");
                    break;
                }
                continue;
            }
            double num2 = sc.nextDouble();

            double resultado;

            switch (opcion) {
                case 1:
                    resultado = num1 + num2;
                    break;
                case 2:
                    resultado = num1 - num2;
                    break;
                case 3:
                    resultado = num1 * num2;
                    break;
                case 4:
                    if (num2 == 0) {
                        System.out.println("❌ Error: No se puede dividir entre cero.");
                        continue;
                    }
                    resultado = num1 / num2;
                    break;
                case 5:
                    resultado = Math.pow(num1, num2);
                    break;
                default:
                    System.out.println("❌ Error inesperado.");
                    continue;
            }

            System.out.println("Resultado: " + resultado);
        }

        sc.close();
    }
}
