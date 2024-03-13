package com.jerezm.crunchydemo.repository;

import com.jerezm.crunchydemo.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    public List<Item> findAllByOrderByIdAsc();
}
