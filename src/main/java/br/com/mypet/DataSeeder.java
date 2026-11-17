package br.com.mypet;

import br.com.mypet.model.Cuidado;
import br.com.mypet.model.Pet;
import br.com.mypet.repository.PetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.util.Base64;
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

        Pet toffee = new Pet();
        toffee.setNome("Toffee");
        toffee.setRaca("Shih-Tzu");
        toffee.setDataNascimento("2025-04-16");
        toffee.setPesoAtual("6,2 kg");
        toffee.setTipoPelagem("Longa e sedosa");
        toffee.setTelefoneVeterinario("(67) 99241-8830");
        toffee.setAlimentacao("55g de ração específica para Shih-Tzu 2x ao dia (110g/dia)");
        toffee.setAlergias("Nenhuma");
        toffee.setMedicamentos("Nenhum");
        toffee.setComportamento("Jovem, brincalhão, muito dócil com visitas e adora petiscos depois do passeio.");
        toffee.setFotoUrl(carregarFotoBase64("static/img/toffee.jpg", "image/jpeg"));
        toffee.setCuidados(List.of(
            criarCuidado("Vacina", "V10 (Reforço anual)", "2026-05-14", "2027-05-14"),
            criarCuidado("Vacina", "Antirrábica", "2026-05-14", "2027-05-14"),
            criarCuidado("Vacina", "Gripe Canina (Tosse dos Canis)", "2026-02-19", "2027-02-19"),
            criarCuidado("Vermífugo", "Drontal Plus", "2026-09-03", "2026-12-02"),
            criarCuidado("Antipulgas", "NexGard (4 a 10 kg)", "2026-10-22", "2026-11-21"),
            criarCuidado("Banho", "Banho completo + hidratação", "2026-11-06", "2026-11-21"),
            criarCuidado("Tosa", "Tosa bebê na tesoura", "2026-09-28", "2026-11-27")
        ));

        petRepository.save(toffee);
    }

    private String carregarFotoBase64(String caminhoClasspath, String mimeType) {
        try {
            ClassPathResource resource = new ClassPathResource(caminhoClasspath);
            byte[] bytes = resource.getInputStream().readAllBytes();
            return "data:" + mimeType + ";base64," + Base64.getEncoder().encodeToString(bytes);
        } catch (Exception e) {
            return "/img/toffee.jpg";
        }
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