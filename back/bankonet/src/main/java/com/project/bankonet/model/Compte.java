package com.project.bankonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name="comptes")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE) //definition du type de stratégie d'héritage
@DiscriminatorColumn(name="DTYPE",discriminatorType=DiscriminatorType.STRING)
public class Compte {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_COMPTE")
    protected int id;

    @Column(name = "INTITULE")
    protected String intitule;

    @Column(name = "SOLDE")
    protected double solde;

    @Column(name = "ID_CLIENT")
    protected int id_client;

    @Column(name = "DTYPE", insertable = false, updatable = false)
    protected String dType;

    @ManyToOne
    @JoinColumn(name="ID_CLIENT", nullable=false, referencedColumnName = "ID_CLIENT", insertable = false, updatable = false)
    @JsonIgnore
      protected Client client;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIntitule() {
        return intitule;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public double getSolde() {
        return solde;
    }

    public void setSolde(double solde) {
        this.solde = solde;
    }

    public int getId_client() {
        return id_client;
    }

    public void setId_client(int id_client) {
        this.id_client = id_client;
    }

    public String getdType() {
        return dType;
    }

    public void setdType(String dType) {
        this.dType = dType;
    }
}
