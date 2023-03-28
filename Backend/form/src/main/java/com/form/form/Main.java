package com.form.form;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/form")
@Component
public class Main {

    private PersonRepo personRepo;

    @Autowired
    public Main(PersonRepo personRepo){

        this.personRepo = personRepo;
    }


    @PostMapping("/addPerson")
    public Person addPerson(@RequestBody Person person){
        personRepo.save(person);
        return person;
    }
}
