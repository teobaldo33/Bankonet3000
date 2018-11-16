package com.project.bankonet.model;

import java.util.List;
import javax.persistence.*;

import java.io.Serializable;

@Entity
@Table(name="clients")
public class Client implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_CLIENT")
    private int id_client;

    @OneToMany(mappedBy = "client")
    private List<Compte> cc;

    @Column(name = "NOM")
    private String nom;

    @Column(name = "PRENOM")
    private String prenom;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "TEL")
    private String tel;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public int getId_client() {
        return id_client;
    }

    public void setId_client(int id_client) {
        this.id_client = id_client;
    }

    public Client() {
    }

    public List<Compte> getCc() {
        return cc;
    }

    public void setCc(List<Compte> cc) {
        this.cc = cc;
    }

}

