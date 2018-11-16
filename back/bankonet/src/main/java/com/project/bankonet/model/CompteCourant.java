package com.project.bankonet.model;

import javax.persistence.*;

@Entity
@DiscriminatorValue("CC")
public class CompteCourant extends Compte {

    @Column(name = "DECOUVERT")
    private double decouvert;

    public double getDecouvert() {
        return decouvert;
    }

    public void setDecouvert(double decouvert) {
        this.decouvert = decouvert;
    }
}
