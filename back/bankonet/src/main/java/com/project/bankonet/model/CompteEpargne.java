package com.project.bankonet.model;

import javax.persistence.*;

@Entity
@DiscriminatorValue("CE")
public class CompteEpargne extends Compte {

    @Column(name = "SOLDEMIN")
    private int solde_min;

    @Column(name = "INTERET")
    private int interet;

    public int getInteret() {
        return interet;
    }

    public void setInteret(int interet) {
        this.interet = interet;
    }

    public int getSolde_min() {
        return solde_min;
    }

    public void setSolde_min(int solde_min) {
        this.solde_min = solde_min;
    }
}
