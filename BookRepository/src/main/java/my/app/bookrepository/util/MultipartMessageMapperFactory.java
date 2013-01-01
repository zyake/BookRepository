package my.app.bookrepository.util;

import my.lib.net.mime.ofm.DefaultMultipartMessageMapper;
import my.lib.net.mime.ofm.EntityConverter;
import my.lib.net.mime.ofm.MultipartMessageMapper;
import my.lib.net.mime.ofm.acceptors.FormDataNameAcceptor;
import my.lib.net.mime.ofm.converters.IntegerEntityConvereter;
import my.lib.net.mime.ofm.converters.TextEntityConverter;
import my.lib.net.mime.ofm.converters.ThreadSafeDateEntityConverter;
import my.lib.net.mime.ofm.injectors.FormDataFieldInjector;

import javax.annotation.ManagedBean;
import javax.enterprise.inject.Produces;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@ManagedBean
public class MultipartMessageMapperFactory {

    @Produces
    @Named("register")
    public MultipartMessageMapper createRegisterMessageMapper() {
        List<EntityConverter> entityConverters = new ArrayList<>();
        Collections.addAll(entityConverters,
                new TextEntityConverter(new FormDataNameAcceptor("name")),
                new TextEntityConverter(new FormDataNameAcceptor("url")),
                new TextEntityConverter(new FormDataNameAcceptor("publishers")),
                new IntegerEntityConvereter(new FormDataNameAcceptor("price")),
                new ThreadSafeDateEntityConverter(new FormDataNameAcceptor("purchaseDate"), "yyyy-MM-dd"),
                new IntegerEntityConvereter(new FormDataNameAcceptor("readingStates")),
                new TextEntityConverter(new FormDataNameAcceptor("comment")),
                new TextEntityConverter(new FormDataNameAcceptor("ranks")),
                new TextEntityConverter(new FormDataNameAcceptor("genres"))
        );

        MultipartMessageMapper mapper = new DefaultMultipartMessageMapper(entityConverters, new FormDataFieldInjector());

        return mapper;
    }
}
