public class Calculadora {
    public static void main(String[] args) {
        // Uso de lógica de los submódulos Suma y Resta para operaciones con enteros
        int resultadoSuma = Suma.sumar(60, 18);
        int resultadoResta = Resta.restar(60, 18);
        
        // Impresión de ejemplo suma con enteros
        System.out.println("\n---SUMA Y RESTA DE ENTEROS---");
        System.out.println("60 + 18 = " + resultadoSuma);
        System.out.println("60 - 18 = " + resultadoResta);
        
        
        // Uso de lógica de los submódulos Suma y Resta para operaciones con decimales
        System.out.println("\n---SUMA Y RESTA DE DECIMALES---");
        double resultadoSumaDecimal = Suma.sumar(8.5, 5.2);
        double resultadoRestaDecimal = Resta.restar(8.5, 5.2);
        
        // Impresión de ejemplo suma con decimales
        System.out.println("8.5 + 5.2 = " + resultadoSumaDecimal);
        System.out.println("8.5 - 5.2 = " + resultadoRestaDecimal);
    }
}