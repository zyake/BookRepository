package my.app.bookrepository.util;

import my.lib.net.mime.DefaultMultipartMessageParser;
import my.lib.net.mime.MultipartMessageParser;

import javax.annotation.ManagedBean;
import javax.enterprise.inject.Produces;

@ManagedBean
public class MultipartMessageParserFactory {

    @Produces
    public MultipartMessageParser createRegisterMessageParser() {
        MultipartMessageParser parser = new DefaultMultipartMessageParser();

        return parser;
    }
}
