package br.com.mypet.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String raca;
    private String dataNascimento;
    private String pesoAtual;
    private String tipoPelagem;
    private String telefoneVeterinario;
    private String alimentacao;
    private String alergias;
    private String medicamentos;
    private String comportamento;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String fotoUrl;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id")
    private List<Cuidado> cuidados = new ArrayList<>();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getRaca() { return raca; }
    public void setRaca(String raca) { this.raca = raca; }

    public String getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(String dataNascimento) { this.dataNascimento = dataNascimento; }

    public String getPesoAtual() { return pesoAtual; }
    public void setPesoAtual(String pesoAtual) { this.pesoAtual = pesoAtual; }

    public String getTipoPelagem() { return tipoPelagem; }
    public void setTipoPelagem(String tipoPelagem) { this.tipoPelagem = tipoPelagem; }

    public String getTelefoneVeterinario() { return telefoneVeterinario; }
    public void setTelefoneVeterinario(String telefoneVeterinario) { this.telefoneVeterinario = telefoneVeterinario; }

    public String getAlimentacao() { return alimentacao; }
    public void setAlimentacao(String alimentacao) { this.alimentacao = alimentacao; }

    public String getAlergias() { return alergias; }
    public void setAlergias(String alergias) { this.alergias = alergias; }

    public String getMedicamentos() { return medicamentos; }
    public void setMedicamentos(String medicamentos) { this.medicamentos = medicamentos; }

    public String getComportamento() { return comportamento; }
    public void setComportamento(String comportamento) { this.comportamento = comportamento; }

    public String getFotoUrl() { return fotoUrl; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }

    public List<Cuidado> getCuidados() { return cuidados; }
    public void setCuidados(List<Cuidado> cuidados) { this.cuidados = cuidados; }
}