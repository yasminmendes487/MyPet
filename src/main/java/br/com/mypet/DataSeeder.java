package br.com.mypet;

import br.com.mypet.model.Cuidado;
import br.com.mypet.model.Pet;
import br.com.mypet.repository.PetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final PetRepository petRepository;

    public DataSeeder(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Override
    public void run(String... args) {
        if (petRepository.count() > 0) {
            return;
        }

        // 1. Toffee
        Pet tofee = new Pet();
        tofee.setNome("Toffee");
        tofee.setRaca("Shih-Tzu");
        tofee.setDataNascimento("2025-04-16");
        tofee.setPesoAtual("6,2 kg");
        tofee.setTipoPelagem("Longa e sedosa");
        tofee.setTelefoneVeterinario("(67) 99241-8830");
        tofee.setAlimentacao("55g de ração específica para Shih-Tzu 2x ao dia (110g/dia)");
        tofee.setAlergias("Nenhuma");
        tofee.setMedicamentos("Nenhum");
        tofee.setComportamento("Jovem, brincalhão, muito dócil com visitas e adora petiscos depois do passeio.");
        tofee.setFotoUrl("https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?auto=format&fit=crop&w=400&q=80");
        tofee.setCuidados(List.of(
            criarCuidado("Vacina", "V10 (Polivalente)", "2026-06-10", "2027-06-10"),
            criarCuidado("Vacina", "Antirrábica", "2026-06-10", "2027-06-10"),
            criarCuidado("Vacina", "Gripe Canina (Tosse dos Canis)", "2026-07-15", "2027-07-15"),
            criarCuidado("Vermífugo", "Drontal Puppy/Adulto", "2026-10-01", "2026-12-30"),
            criarCuidado("Antipulgas", "NexGard (4 a 10 kg)", "2026-11-05", "2026-12-05"),
            criarCuidado("Banho", "Banho completo + hidratação", "2026-11-12", "2026-11-27"),
            criarCuidado("Tosa", "Tosa bebê na tesoura", "2026-10-20", "2026-12-19")
        ));

        // 2. NINA 
        Pet nina = new Pet();
        nina.setNome("Nina");
        nina.setRaca("Pinscher");
        nina.setDataNascimento("2015-05-10");
        nina.setPesoAtual("8,8 kg");
        nina.setTipoPelagem("Curta e lisa (preta)");
        nina.setTelefoneVeterinario("(67) 99812-4510");
        nina.setAlimentacao("80g de ração porte pequeno sênior 2x ao dia (160g/dia)");
        nina.setAlergias("Sensibilidade a corantes artificiais");
        nina.setMedicamentos("Suplemento vitamínico sênior (1x ao dia)");
        nina.setComportamento("Protetora, alerta a qualquer movimento no portão, gosta de ficar enrolada em cobertas.");
        nina.setFotoUrl("https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=400&q=80");
        nina.setCuidados(List.of(
            criarCuidado("Vacina", "V10 (Polivalente)", "2026-05-20", "2027-05-20"),
            criarCuidado("Vacina", "Antirrábica", "2026-05-20", "2027-05-20"),
            criarCuidado("Vermífugo", "Endogard", "2026-09-15", "2026-12-14"),
            criarCuidado("Antipulgas", "Simparic (5,1 a 10 kg)", "2026-10-20", "2026-11-24"),
            criarCuidado("Banho", "Banho morno + corte de unhas", "2026-11-10", "2026-11-25")
        ));

        // 3. ALFREDO 
        Pet alfredo = new Pet();
        alfredo.setNome("Alfredo");
        alfredo.setRaca("SRD (Vira-lata)");
        alfredo.setDataNascimento("");
        alfredo.setPesoAtual("12,5 kg");
        alfredo.setTipoPelagem("Curta e densa (branca)");
        alfredo.setTelefoneVeterinario("(67) 99104-7722");
        alfredo.setAlimentacao("110g de ração premium adultos 2x ao dia (220g/dia)");
        alfredo.setAlergias("Nenhuma");
        alfredo.setMedicamentos("Nenhum");
        alfredo.setComportamento("Companheiro, calmo dentro de casa, adora tomar sol na varanda e passear na guia.");
        alfredo.setFotoUrl("https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80");
        alfredo.setCuidados(List.of(
            criarCuidado("Vacina", "V10 (Polivalente)", "2026-09-10", "2027-09-10"),
            criarCuidado("Vacina", "Antirrábica", "2026-09-10", "2027-09-10"),
            criarCuidado("Vacina", "Giárdia", "2026-09-25", "2027-09-25"),
            criarCuidado("Vermífugo", "Milbemax", "2026-08-15", "2026-11-13"),
            criarCuidado("Antipulgas", "Bravecto (10 a 20 kg)", "2026-10-10", "2027-01-08"),
            criarCuidado("Banho", "Banho completo", "2026-11-08", "2026-11-23")
        ));

        petRepository.saveAll(List.of(tofee, nina, alfredo));
    }

    private Cuidado criarCuidado(String tipo, String descricao, String data, String proxima) {
        Cuidado c = new Cuidado();
        c.setTipo(tipo);
        c.setDescricao(descricao);
        c.setData(data);
        c.setProxima(proxima);
        return c;
    }
}