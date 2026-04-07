@Entity
public class Medida {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Double peso;
    private Double altura;
    private LocalDate dataRegistro;

    // Lógica complexa embutida
    public Double getImc() {
        return peso / (altura * altura);
    }
}