package fr.seblaporte.springboot2app.model;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

@MappedSuperclass
public abstract class BaseEntity implements Serializable {

    private void uppercaseFields() {
        Class<? extends BaseEntity> clazz = this.getClass();
        List<Field> fields = new ArrayList<>();
        Class<?> superClazz = clazz;
        while (!superClazz.equals(BaseEntity.class)) {
            fields.addAll(Arrays.asList(superClazz.getDeclaredFields()));
            superClazz = superClazz.getSuperclass();
        }
        fields.forEach(this::transformFieldToUppercase);
    }

    private void transformFieldToUppercase(Field field) {
        if (!field.getType().equals(String.class)) {
            return;
        }
        try {
            Boolean unsetAccessible = false;
            if (!field.isAccessible()) {
                unsetAccessible = true;
                field.setAccessible(true);
            }
            String entityFieldValue = (String) field.get(this);
            if (entityFieldValue != null) {
                field.set(this, entityFieldValue.toUpperCase());
            }
            if (unsetAccessible) {
                field.setAccessible(false);
            }
        } catch (IllegalAccessException ex) {
            // We set the field to accessible so field.get() should never throw this
        }
    }

    @PrePersist
    @PreUpdate
    public void antesPersist() {
        uppercaseFields();
    }

}
