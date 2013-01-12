package my.app.bookrepository.util;

import my.lib.net.mime.ofm.Converters;
import my.lib.net.mime.ofm.Injectors;
import my.lib.net.mime.ofm.MapperBuilder;
import my.lib.net.mime.ofm.MultipartMessageMapper;

import javax.annotation.ManagedBean;
import javax.enterprise.inject.Produces;

@ManagedBean
public class MultipartMessageMapperFactory {

    @Produces
    public MultipartMessageMapper createMapper() {
        MultipartMessageMapper mapper = new MapperBuilder()
                .addHolder(Converters.INTEGER, "no")
                .addHolder(Converters.INTEGER, "revision")
                .addHolder(Converters.TEXT, "name")
                .addHolder(Converters.TEXT, "url")
                .addHolder(Converters.TEXT, "publisher")
                .addHolder(Converters.INTEGER, "price")
                .addDateHolder("purchaseDate", "yyyy-MM-dd")
                .addHolder(Converters.INTEGER, "readingState")
                .addHolder(Converters.TEXT, "comment")
                .addHolder(Converters.TEXT, "rank")
                .addHolder(Converters.TEXT, "genre")
                .setInjector(Injectors.FIELD)
                .build();

        return mapper;
    }
}
