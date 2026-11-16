package br.com.mypet.model;

import jakarta.persistence.*;

@Entity
public class Cuidado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;
    private String descricao;
    private String data;
    private String proxima;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getData() { return data; }
    public void setData(String data) { this.data = data; }

    public String getProxima() { return proxima; }
    public void setProxima(String proxima) { this.proxima = proxima; }
}