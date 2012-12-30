package my.app.bookrepository.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Selection {

   private String key;

   private List<String> list;

    public Selection(String key, List<String> list) {
        this.key = key;

        List<String> newList = new ArrayList<>();
        newList.addAll(list);
        this.list = Collections.unmodifiableList(newList);
    }

    public String getKey() {
        return key;
    }

    public List<String> getList() {
        return list;
    }
}
