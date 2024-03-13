package com.jerezm.crunchydemo.api;

import com.jerezm.crunchydemo.dto.ItemDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminResource {
    Logger logger = LoggerFactory.getLogger(AdminResource.class);

    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAdmin() {
        logger.info("[DEBUG] valid admin");

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
