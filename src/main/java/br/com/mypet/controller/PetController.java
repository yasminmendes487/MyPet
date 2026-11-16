package br.com.mypet.controller;

import br.com.mypet.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetController {

    private final JpaRepository<Pet, Long> petRepository;

    public PetController(JpaRepository<Pet, Long> petRepository) {
        this.petRepository = petRepository;
    }

    @GetMapping
    public List<Pet> listarTodos() {
        return petRepository.findAll();
    }

    @PostMapping
    public Pet salvarOuAtualizar(@RequestBody Pet pet) {
        return petRepository.save(pet);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        petRepository.deleteById(id);
    }
}