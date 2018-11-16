package com.project.bankonet;


import com.project.bankonet.model.Client;
import com.project.bankonet.model.CompteCourant;
import com.project.bankonet.repository.CompteCourantRepository;
import com.project.bankonet.repository.ClientRepository;
import com.project.bankonet.repository.CompteEpargneRepository;
import com.project.bankonet.service.ServiceClient;
import com.project.bankonet.service.ServiceCompteCourant;
import com.project.bankonet.service.ServiceCompteEpargne;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
public class ServiceClientTest {

    @InjectMocks
    private ServiceClient serviceClient;

    @Mock
    private ServiceCompteEpargne serviceCompteEpargne;

    @Mock
    private ServiceCompteCourant serviceCompteCourant;

    @Mock
    private CompteCourantRepository compteCourantRepository;

    @Mock
    private CompteEpargneRepository compteEpargneRepository;

    @Mock
    private ClientRepository clientRepository;

    @Before
    public void beforeTests(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testTest() throws Exception{
        int i = 1 ;
        int j = 1 ;
        assertEquals(i,j);
    }




    @Test
    public void testCreateClient() throws Exception{
        Client client = new Client();
        client.setEmail("toto@toto.toto");
        client.setTel("0090909090");
        client.setNom("TOTO");
        client.setPrenom("toto");
        Client c = new Client();
        Client c2 =  serviceClient.createClient(client);
    }

    @Test
    public void getAllClient_WhenNoClient_ThenNull() throws Exception{
        //given
        when(clientRepository.findAll()).thenReturn(null);

        //when
        List<Client> listingClient =  serviceClient.getAllClients();

        //then
        assertEquals(null, listingClient );

    }
    @Test
    public void getClientById_WhenIdIsWrong_ThenNull() throws Exception{
        //GIVEN
        when(clientRepository.findById(3)).thenReturn(null);
        //WHEN
        Client c = serviceClient.getClientById(3);
        //THEN
        assertEquals(null, c);
    }
    @Test
    public void getClientById_WhenIdIsGood_ThenTrue() throws Exception{
        //GIVEN
        Client c = new Client();
        c.setId_client(3);
        clientRepository.save(c);
        when(clientRepository.findById(3)).thenReturn(null);
        //WHEN
        Client D = serviceClient.getClientById(3);
        //THEN
        assertEquals(3, D.getId_client());
    }
    @Test
    public void getAllClient_WhenMannyClient_Then2() throws Exception{

        //GIVEN
        Client c1 = new Client();
        Client c2 = new Client();
        List<Client> listingC = new ArrayList<>();

        c1.setPrenom("TUTU");
        c1.setNom("tutu");
        c1.setTel("0909090990");
        c1.setEmail("tutu@tutu.tutu");

        c2.setPrenom("TITI");
        c2.setNom("tutu");
        c2.setEmail("titi@titi.titi");
        c2.setTel("0908080808");

        listingC.add(c1);
        listingC.add(c2);

        when(clientRepository.findAll()).thenReturn(listingC);

        //when
        List<Client> listingClient =  serviceClient.getAllClients();

        //then
        assertEquals(listingClient.size(), 2 );

    }

    @Test
    public void deleteClient_WithCompte_ThenOK() throws Exception {

        //GIVEN
        Client c1 = new Client();
        c1.setId_client(1);
        c1.setPrenom("TUTU");
        c1.setNom("tutu");
        c1.setTel("0909090990");
        c1.setEmail("tutu@tutu.tutu");
        CompteCourant cCourant = new CompteCourant();
        cCourant.setId(2);
        cCourant.setdType("CC");
        c1.setCc(new ArrayList<>());
        c1.getCc().add(cCourant);
        when(clientRepository.findById(1)).thenReturn(c1);

        serviceClient.deleteClient(1);

        Mockito.verify(clientRepository, times(1)).findById(1);
        Mockito.verify(serviceCompteCourant, times(1)).deleteCompteCourant(2);
        Mockito.verify(clientRepository, times(1)).delete(c1);

    }

    @Test
    public void deleteClient_WithoutCompte_ThenOK() throws Exception {

        //GIVEN
        Client c1 = new Client();
        c1.setId_client(1);
        c1.setPrenom("TUTU");
        c1.setNom("tutu");
        c1.setTel("0909090990");
        c1.setEmail("tutu@tutu.tutu");
        when(clientRepository.findById(1)).thenReturn(c1);

        serviceClient.deleteClient(1);

        Mockito.verify(clientRepository, times(1)).findById(1);
        Mockito.verify(serviceCompteCourant, times(0)).deleteCompteCourant(0);
        Mockito.verify(clientRepository, times(1)).delete(c1);

    }

}
